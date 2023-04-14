const express=require('express');
const ADMIN_BLOOD_BANK_CONTROLLER=require('../Controllers/adminBloodBankController');
const { HandleErrors } = require('../middlewares/handleError');
const adminbloodBankRoutes=express.Router();
adminbloodBankRoutes.get("/viewallbloodbank",HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.viewallBoodBank));
adminbloodBankRoutes.post("/addbloodbank",HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.addBloodBank));
adminbloodBankRoutes.put("/updatebloodbank",HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.updatedetails));
adminbloodBankRoutes.delete("/deletebloodbank",HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.deleteDetails));
adminbloodBankRoutes.put("/update-blood-details",HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.update_BloodDetails));


module.exports={adminbloodBankRoutes};

