const express = require("express");
const NGO_PROGRAM_CONTROLLER=require("../Controllers/ngoProgramController");
const ngoProgramRoutes=express.Router();
ngoProgramRoutes.get("/blood_avail_details",NGO_PROGRAM_CONTROLLER.bloodAvailData);
module.exports={ngoProgramRoutes};