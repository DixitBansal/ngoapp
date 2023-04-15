const NGO_POSTS_SERVICE=require('../Services/ngoPostsService');
const viewallPosts=async(req,res)=>{
    const response=await NGO_POSTS_SERVICE.viewNgoPosts(req.query);
    console.log(response)
    res.status(200).send(response);
}
module.exports={viewallPosts};