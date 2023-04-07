const express = require("express");

const userController=require("../Controllers/userController")
const userRoutes = express.Router();
userRoutes.post('/add-user-profile',userController.userSignup);
userRoutes.put('/updatepass',userController.updatePass);
userRoutes.get('/getuserdata',userController.getUserData);
module.exports={userRoutes};
