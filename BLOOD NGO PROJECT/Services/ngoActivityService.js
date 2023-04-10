const db = require('../DB/connection');
const ngoPosts=async(params)=>{
    console.log("limit=",params.limit);
    console.log("offset=",params.offset);
    const limit = parseInt(params.limit) || 10; // default limit is 10
    const offset = parseInt(params.offset) || 0; // default offset is 0
    try {
        const {rows} = await db.query('SELECT * FROM ngo_activity_posts ORDER BY CONCAT(created_date, \' \', created_time) DESC LIMIT $1 OFFSET $2', [limit, offset]);
        let response={};
        const posts=rows;
        console.log("posts=",posts);
        if(posts.length>0){
            response={
                success:true,
                data:posts,
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
module.exports={ngoPosts};