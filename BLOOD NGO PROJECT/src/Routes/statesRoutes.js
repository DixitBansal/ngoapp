const express = require("express");
const { HandleErrors } = require("../middlewares/handleError");
const { getStates, getdistricts } = require("../Controllers/statesController");
const statesRoutes = express.Router();
statesRoutes.get("/states/all", getStates);
statesRoutes.get("/districts/all", getdistricts);
module.exports = { statesRoutes };
