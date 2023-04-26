const express = require("express");
const Routes = express();

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
const { statesRoutes } = require("./Routes/statesRoutes");
const { postVerificationRoutes } = require("./Routes/postVerificationRoutes");

Routes.use("/user", userRoutes);
Routes.use("/auth", authRoutes);
Routes.use("/ngoProgram", ngoProgramRoutes);
Routes.use("/ngoActivity", ngoActivityRoutes);
Routes.use("/ngo", ngoNotificationRoutes);
Routes.use("/admin/blood-source", adminbloodBankRoutes);
Routes.use("/admin/employee", employeeRoutes);
Routes.use("/admin/blood_donation_camps", bloodCampRoutes);
Routes.use("/admin", statesRoutes);
Routes.use("/employee/ngo-activity-post", ngoPostsRoutes);
Routes.use("/admin/ngo-post", postVerificationRoutes);

module.exports = { Routes };
