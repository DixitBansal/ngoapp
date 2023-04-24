const express = require("express");
const ADMIN_BLOOD_BANK_CONTROLLER = require("../Controllers/adminBloodBankController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
const adminbloodBankRoutes = express.Router();

adminbloodBankRoutes.get(
  "/all",
  Auth,
  // isAdmin,
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.viewallBoodBank)
);
adminbloodBankRoutes.post(
  "/add",
  Auth,
  // isAdmin,
  HandleErrors(ADMIN_BLOOD_BANK_CONTROLLER.addBloodBank)
);
adminbloodBankRoutes.put(
  "/update",
  Auth,
  // isAdmin,
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
