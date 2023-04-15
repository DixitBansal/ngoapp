const express = require("express");
const ADMIN_BLOOD_BANK_CONTROLLER = require("../Controllers/adminBloodBankController");
const { HandleErrors } = require("../middlewares/handleError");
const adminbloodBankRoutes = express.Router();

adminbloodBankRoutes.get(
  "/all",
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.viewallBoodBank)
);
adminbloodBankRoutes.post(
  "/add",
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.addBloodBank)
);
adminbloodBankRoutes.put(
  "/update",
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.updatedetails)
);
adminbloodBankRoutes.delete(
  "/",
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.deleteDetails)
);
adminbloodBankRoutes.put(
  "/update-blood-details/:bbid",
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.update_BloodDetails)
);

module.exports = { adminbloodBankRoutes };
