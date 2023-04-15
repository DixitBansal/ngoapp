const express=require('express');
const BLOOD_CAMP_CONTROLLER=require('../Controllers/bloodCampController');
const { HandleErrors } = require('../middlewares/handleError');
const bloodCampRoutes=express.Router();
bloodCampRoutes.get("/viewallcamps",HandleErrors(BLOOD_CAMP_CONTROLLER.viewCamps));
bloodCampRoutes.post("/add-blood-camp",HandleErrors(BLOOD_CAMP_CONTROLLER.addBloodCamp));
bloodCampRoutes.put("/update-camp-details",HandleErrors(BLOOD_CAMP_CONTROLLER.editCampDetails));
bloodCampRoutes.delete("/delete-camp",HandleErrors(BLOOD_CAMP_CONTROLLER.deleteBCamp));
module.exports={bloodCampRoutes};