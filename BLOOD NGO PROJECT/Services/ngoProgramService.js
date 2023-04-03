const db = require('../DB/connection');

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
    const blood_bank_data=data1.rows[0];
    const hospital_data=data2.rows[0];
   
    if(hospital_data || blood_bank_data){
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
module.exports={bloodAvailData};