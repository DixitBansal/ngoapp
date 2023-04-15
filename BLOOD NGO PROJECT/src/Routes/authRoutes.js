const express = require("express");
const {
  userLogin,
  signup,
  checkPhone,
  OTPforgotPass,
  OTPVerify,
} = require("../Controllers/authController");
const { HandleErrors } = require("../middlewares/handleError");
const authRoutes = express.Router();

authRoutes.get("/login", HandleErrors(userLogin));
authRoutes.get("/signup", HandleErrors(signup));
authRoutes.get("/checkphone", HandleErrors(checkPhone));
authRoutes.get("/forgotpass", HandleErrors(OTPforgotPass));
authRoutes.get("/OTPVerify", HandleErrors(OTPVerify));

module.exports = { authRoutes };
