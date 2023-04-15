const { response } = require('express');
const db = require('../DB/connection');
const viewallBoodCamp=async(params)=>{
    const limit = parseInt(params.limit) || 10; // default limit is 10
    const offset = parseInt(params.offset) || 0; // default offset is 0
    console.log(limit,offset)
    try {
        const {rows} = await db.query('SELECT * FROM donation_camp ORDER BY camp_id DESC LIMIT $1 OFFSET $2',[limit,offset]);
        let response={};
        const data=rows;
        console.log(rows);
        if(data.length>0){
            response={
                success:true,
                data:data,
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

      } catch (err) {
        return response={
            message:err.message
        }
      }
}

const addBloodCamp=async(params)=>{
    const {camp_name,camp_address,camp_state,camp_district,contact,conducted_by,organized_by,date,time,duration,pincode}=params;
    const {rowCount}=await db.query('INSERT INTO donation_camp (camp_name,camp_address,camp_state,camp_district,contact,conducted_by,organized_by,date,time,duration,pincode) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)',[camp_name,camp_address,camp_state,camp_district,contact,conducted_by,organized_by,date,time,duration,pincode]);
    const rows=rowCount;
    // console.log(rows);
    let response={};
    if(rows>0){
        response={
            msg:"blood-camp added successfully",
            success:"true" 
        }
    }
    else{
        response={
            msg:"something went wrong",
            success:false
        }
    }
    return response;
}
const editBCampDEtails=async(params)=>{
    const {camp_name,camp_address,camp_state,camp_district,contact,conducted_by,organized_by,date,time,duration,pincode,camp_id}=params;
    console.log(params)
    const {rowCount}=await db.query('UPDATE donation_camp SET camp_name=$1,camp_address=$2,camp_state=$3,camp_district=$4,contact=$5,conducted_by=$6,organized_by=$7,date=$8,time=$9,duration=$10,pincode=$11 WHERE camp_id=$12',
    [camp_name,camp_address,camp_state,camp_district,contact,conducted_by,organized_by,date,time,duration,pincode,camp_id]);
    let response={};
    if(rowCount>0){
        response={
            msg:"camp_details updated successfully",
            success:"true" 
        }
    }
    else{
        response={
            msg:"something went wrong",
            success:false
        }
    }
    return response;

}
const deleteBCamp=async(params)=>{
    const {camp_id}=params;
    const {rowCount}=await db.query('DELETE FROM donation_camp where camp_id=$1',[camp_id]);
    let response={};
    if(rowCount>0){
        response={
            msg:"blood-camp deleted successfully",
            success:"true" 
        }
    }
    else{
        response={
            msg:"something went wrong",
            success:false
        }
        
    }
    return response;
}
module.exports={viewallBoodCamp,addBloodCamp,editBCampDEtails,deleteBCamp}