const express = require("express");
const Routes = express.Router();

const { userRoutes } = require("./Routes/userRoutes");
const { authRoutes } = require("./Routes/authRoutes");
const { ngoProgramRoutes } = require("./Routes/ngoProgramRoutes");
const { ngoActivityRoutes } = require("./Routes/ngoActivityRoutes");
const { ngoNotificationRoutes } = require("./Routes/ngoNotificationRoutes");
const {
  adminRoutes,
  adminbloodBankRoutes,
} = require("./Routes/adminBloodBankRoutes");
const { employeeRoutes } = require("./Routes/employeeRoutes");
const { bloodCampRoutes } = require("./Routes/bloodCampRoutes");
const { ngoPostsRoutes } = require("./Routes/ngoPostsRoutes");

Routes.use("/user", userRoutes);
Routes.use("/auth", authRoutes);
Routes.use("/ngoProgram", ngoProgramRoutes);
Routes.use("/ngoActivity", ngoActivityRoutes);
Routes.use("/ngo", ngoNotificationRoutes);
Routes.use("/admin/blood-bank", adminbloodBankRoutes);
Routes.use("/admin/employee", employeeRoutes);
Routes.use("/admin/blood_donation_camps", bloodCampRoutes);
Routes.use("/admin/ngoposts", ngoPostsRoutes);

module.exports = { Routes };
