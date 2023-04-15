const db = require('../DB/connection');
const viewallEmployee=async(params)=>{
    const limit = parseInt(params.limit) || 10; // default limit is 10
    const offset = parseInt(params.offset) || 0; // default offset is 0
    try {
        const {rows} = await db.query('SELECT * FROM users ORDER BY id DESC LIMIT $1 OFFSET $2',[limit,offset]);
        let response={};
        const data=rows;
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
const deleteEmployee=async(params)=>{
    const {id}=params;
    const {rowCount}=await db.query('DELETE FROM users where id=$1',[id]);
    let response={};
    if(rowCount>0){
        response={
            msg:"Employee deleted successfully",
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
module.exports={viewallEmployee,deleteEmployee};