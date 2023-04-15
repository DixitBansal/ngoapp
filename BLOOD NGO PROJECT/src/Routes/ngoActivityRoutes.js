const express = require("express");
const NGO_ACTIVITY_CONTROLLER=require('../Controllers/ngoActivityController');
const { HandleErrors } = require("../middlewares/handleError");
const ngoActivityRoutes=express.Router();
ngoActivityRoutes.get("/getposts",HandleErrors(NGO_ACTIVITY_CONTROLLER.ngoPosts));
module.exports={ngoActivityRoutes};

