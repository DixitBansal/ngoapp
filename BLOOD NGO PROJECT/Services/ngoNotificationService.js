const db = require('../DB/connection');
const getNotification=async(params)=>{
    try {
        const {rows} = await db.query('SELECT * FROM notifications WHERE created_date >= date_trunc(\'day\', NOW() - interval \'30 days\')');
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
module.exports={getNotification};