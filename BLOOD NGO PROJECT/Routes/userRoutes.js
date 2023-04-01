const express = require("express");
const userController=require("../Controllers/userController")
const userRoutes = express.Router();
userRoutes.post('/add-user-profile',userController.userSignup);
userRoutes.put('/updatepass',userController.updatePass);
module.exports={userRoutes};
