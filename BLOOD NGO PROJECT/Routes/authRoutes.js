const express = require("express");
const AuthController=require("../Controllers/authController");
const authRoutes = express.Router();
authRoutes.get("/login", AuthController.userLogin);
authRoutes.get("/OTPSignup", AuthController.OTPSignup);
authRoutes.get('/checkphone',AuthController.checkPhone);
authRoutes.get('/forgotpass',AuthController.OTPforgotPass);
authRoutes.get("/OTPVerify", AuthController.OTPVerify);
module.exports={authRoutes};
