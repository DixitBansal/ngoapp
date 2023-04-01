const express = require("express");
const { userLogin, userSignup,OTPSignup, OTPVerify, checkPhone, updatePass, OTPforgotPass } = require("../Controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/login", userLogin);
userRoutes.get("/OTPSignup", OTPSignup);
userRoutes.get("/OTPVerify", OTPVerify);
userRoutes.post('/add-user-profile',userSignup);
userRoutes.put('/updatepass',updatePass);
userRoutes.get('/checkphone',checkPhone);
userRoutes.get('/forgotpass',OTPforgotPass);

module.exports={userRoutes}
