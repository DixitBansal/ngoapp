const express = require("express");
const multer = require("multer");
let upload = multer({
  limits: 1024 * 1024 * 5,
});
const NGO_PROGRAM_CONTROLLER = require("../Controllers/ngoProgramController");
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");
const ngoProgramRoutes = express.Router();

ngoProgramRoutes.post(
  "/blood-avail-details",
  Auth,
  HandleErrors(NGO_PROGRAM_CONTROLLER.bloodAvailData)
);

ngoProgramRoutes.post(
  "/blood-camp-details",
  Auth,
  HandleErrors(NGO_PROGRAM_CONTROLLER.bloodCampData)
);

ngoProgramRoutes.post(
  "/upload-request-details",
  Auth,
  upload.array("images", 3),
  HandleErrors(NGO_PROGRAM_CONTROLLER.volunteer_req_data)
);

module.exports = { ngoProgramRoutes };
