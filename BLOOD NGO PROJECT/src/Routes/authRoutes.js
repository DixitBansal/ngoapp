const express = require("express");
const {
  userLogin,
  signup,
  checkPhone,
  OTPforgotPass,
  OTPVerify,
  signupVerification,
  resendOTP,
  resetPassword,
} = require("../Controllers/authController");
const { HandleErrors } = require("../middlewares/handleError");
const authRoutes = express.Router();

authRoutes.post("/login", HandleErrors(userLogin));

authRoutes.post("/signup", HandleErrors(signup));

authRoutes.post("/signup-verification", HandleErrors(signupVerification));

authRoutes.post("/forgot-password", HandleErrors(OTPforgotPass));

authRoutes.post("/otp-verify", HandleErrors(OTPVerify));

authRoutes.post("/resend-otp", HandleErrors(resendOTP));

authRoutes.post("/reset-password", HandleErrors(resetPassword));

module.exports = { authRoutes };
