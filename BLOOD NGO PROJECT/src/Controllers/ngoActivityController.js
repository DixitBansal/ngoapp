const NGO_ACTIVITY_SERVICE=require('../Services/ngoActivityService');
const ngoPosts=async(req,res)=>{
    const response=await NGO_ACTIVITY_SERVICE.ngoPosts(req.query);
    res.status(200).send(response);
}
module.exports={ngoPosts};