const NGO_NOTIFICATION_SERVICE=require('../Services/ngoNotificationService');
const getNotification=async(req,res)=>{
    const response=await NGO_NOTIFICATION_SERVICE.getNotification();
    res.status(200).send(response);
}
module.exports={getNotification};