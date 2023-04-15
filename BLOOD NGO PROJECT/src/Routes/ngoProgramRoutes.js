const express = require("express");
const multer=require('multer');
let upload=multer({
    limits:1024*1024*5
})
const NGO_PROGRAM_CONTROLLER=require("../Controllers/ngoProgramController");
const { HandleErrors } = require("../middlewares/handleError");
const ngoProgramRoutes=express.Router();
ngoProgramRoutes.get("/blood_avail_details",HandleErrors(NGO_PROGRAM_CONTROLLER.bloodAvailData));
ngoProgramRoutes.get("/blood_camp_details",HandleErrors(NGO_PROGRAM_CONTROLLER.bloodCampData));
ngoProgramRoutes.post("/upload-request-details",upload.array("images",3),HandleErrors(NGO_PROGRAM_CONTROLLER.volunteer_req_data));
module.exports={ngoProgramRoutes};