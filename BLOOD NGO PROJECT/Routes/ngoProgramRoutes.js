const express = require("express");
const multer=require('multer');
let upload=multer({
    limits:1024*1024*5
})
const NGO_PROGRAM_CONTROLLER=require("../Controllers/ngoProgramController");
const ngoProgramRoutes=express.Router();
ngoProgramRoutes.get("/blood_avail_details",NGO_PROGRAM_CONTROLLER.bloodAvailData);
ngoProgramRoutes.get("/blood_camp_details",NGO_PROGRAM_CONTROLLER.bloodCampData);
ngoProgramRoutes.post("/upload-request-details",upload.array("images",3),NGO_PROGRAM_CONTROLLER.volunteer_req_data);
module.exports={ngoProgramRoutes};