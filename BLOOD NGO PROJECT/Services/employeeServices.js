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
module.exports={viewallEmployee};