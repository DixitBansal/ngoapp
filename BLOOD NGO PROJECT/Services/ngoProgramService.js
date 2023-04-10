const db = require('../DB/connection');
const dotenv=require('dotenv');
dotenv.config();
const AWS=require('aws-sdk');
const multer=require('multer');
const multerS3 = require('multer-s3');
const { response } = require('express');
const awsConfig={
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    bucket_name:process.env.AWS_BUCKET_NAME,
    region:process.env.AWS_REGION
}
const s3=new AWS.S3(awsConfig);

const bloodAvailData=async(params)=>{
    const {state,district,pincode,blood_group,blood_component}=params;
    

    const data1 = await db.query(
        `SELECT bb.blood_bank_name, bb.b_contact, bb.district, bb.state,b.blood_group,b.blood_component,bs.b_avail
        FROM blood_bank AS bb
        INNER JOIN blood AS b ON bb.blood_bank_id=b.blood_bank_id 
        INNER JOIN blood_stock AS bs ON b.blood_id=bs.blood_id
        WHERE (bb.district =$1) AND (bb.state=$2 ) AND (bb.pincode=$3) AND bs.b_avail=TRUE
        AND b.blood_group=$4 AND b.blood_component=$5`,[district.toLowerCase(),state.toLowerCase(),pincode,blood_group,blood_component.toLowerCase()]
    );
    const data2 = await db.query(
        `SELECT h.hname, h.hemail, h.district, h.state,b.blood_group,b.blood_component,bs.b_avail,h.contact
        FROM hospital AS h
        INNER JOIN blood AS b ON h.hospital_id=b.hospital_id 
        INNER JOIN blood_stock AS bs ON b.blood_id=bs.blood_id
        WHERE (h.district =$1) AND (h.state=$2 ) AND h.pincode=$3 AND bs.b_avail=TRUE
        AND b.blood_group=$4 AND b.blood_component=$5`,[district.toLowerCase(),state.toLowerCase(),pincode,blood_group,blood_component.toLowerCase()]
    );
    let response={};
    const blood_bank_data=data1.rows;
    const hospital_data=data2.rows;
   
    if(hospital_data.length>0 || blood_bank_data.length>0){
        response={
            success:true,
            blood_bank_data:blood_bank_data,
            hospital_data:hospital_data,
            message:"Data found"
        }
        return response;
    }
    else{
        response={
            success:false,
            message:"Not Available"
        }
        return response;
    }


}

const bloodCampData=async(params)=>{
    const {state,district,date}=params;
    const {rows}=await db.query(
    `select * from donation_camp where camp_state=$1 AND camp_district=$2 AND date=$3`,[state.toLowerCase(),district.toLowerCase(),date]
    );
    let response={};
    const camp_data=rows;
    if(camp_data.length>0){
        response={
            success:true,
            data:camp_data,
            message:"Data found"
        }
        return response;
    }
    else{
        response={
            success:false,
            message:"Data not found"
        }
        return response;
    }

}

const volunteer_req_data=async(req)=>{
    const user_id=req.query.uid;
    
    
    const uploadToS3=(filedata)=>{
        return new Promise((resolve,reject)=>{
            const params={
                Bucket:process.env.AWS_BUCKET_NAME,
                Key:`${Date.now().toString()}-${filedata.originalname}`,
                Body:filedata.buffer
            }
              s3.upload(params,(err,data)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                console.log(data);
                resolve(data);
            })
        })
       
    }
    let response={};
    let image_array=[];

    if(req.files && req.files.length>0){
        console.log(req.files);
        for(let i=0;i<req.files.length;i++){

            await uploadToS3(req.files[i])
             .then((result)=>{
                image_array.push(result.Location);
             })
             .catch((err)=>{
                 console.log(err);
             })
        }
        const {rows}=await db.query(
            'INSERT INTO volunteer_requests(ngo_certificate,aadhar,pan,user_id) VALUES ($1, $2, $3,$4)',[image_array[0],image_array[1],image_array[2],user_id]
        )
        if(rows>=0){
            response={
                msg:"images uploaded successfully"
                
            }
        }
        else{
            response={
                msg:"something went wrong",
                success:false
            }
        }
    }

    
    return response;

}
   

module.exports={bloodAvailData,bloodCampData,volunteer_req_data};