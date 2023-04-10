const express = require("express");
const NGO_ACTIVITY_CONTROLLER=require('../Controllers/ngoActivityController');
const ngoActivityRoutes=express.Router();
ngoActivityRoutes.get("/getposts",NGO_ACTIVITY_CONTROLLER.ngoPosts);
module.exports={ngoActivityRoutes};

