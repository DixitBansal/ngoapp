const express = require("express");
const { userLogin, userSignup,OTPSignup, OTPVerify, forgotPass, checkPhone } = require("../Controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/login", userLogin);
userRoutes.get("/OTPSend", OTPSignup);
userRoutes.get("/OTPVerify", OTPVerify);
userRoutes.post('/user-profile',userSignup);
userRoutes.put('/updatepass',forgotPass);
userRoutes.get('/checkphone',checkPhone);

module.exports={userRoutes}
