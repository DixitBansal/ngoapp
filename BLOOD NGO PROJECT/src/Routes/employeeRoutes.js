const express = require("express");
const EMPLOYEE_CONTROLLER = require("../Controllers/EmployeeController");
const employeeRoutes = express.Router();
const { HandleErrors } = require("../middlewares/handleError");
const Auth = require("../middlewares/auth");

employeeRoutes.post(
  "/add-employee",
  Auth,
  HandleErrors(EMPLOYEE_CONTROLLER.addEmployee)
);

employeeRoutes.get(
  "/view-employees",
  Auth,
  HandleErrors(EMPLOYEE_CONTROLLER.viewEmployees)
);

employeeRoutes.delete(
  "/delete-employee",
  Auth,
  HandleErrors(EMPLOYEE_CONTROLLER.deleteEmployee)
);

employeeRoutes.get(
  "/get-details/:id",
  Auth,
  HandleErrors(EMPLOYEE_CONTROLLER.employeeDetails)
);

employeeRoutes.post(
  "/edit",
  Auth,
  HandleErrors(EMPLOYEE_CONTROLLER.editEmployee)
);

module.exports = { employeeRoutes };
