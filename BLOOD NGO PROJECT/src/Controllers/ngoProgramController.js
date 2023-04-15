const NGO_PROGRAM_SERVICE=require('../Services/ngoProgramService');

const bloodAvailData=async(req,res)=>{
    const response=await NGO_PROGRAM_SERVICE.bloodAvailData(req.body);
    res.status(200).send(response);
}
const bloodCampData=async(req,res)=>{
    const response=await NGO_PROGRAM_SERVICE.bloodCampData(req.body);
    res.status(200).send(response);
}
const volunteer_req_data=async(req,res)=>{
    const response=await NGO_PROGRAM_SERVICE.volunteer_req_data(req);
    res.status(200).send(response);
}
module.exports={bloodAvailData,bloodCampData,volunteer_req_data};