const express = require("express");
const EMPLOYEE_CONTROLLER = require("../Controllers/EmployeeController");
const employeeRoutes = express.Router();
const { HandleErrors } = require("../middlewares/handleError");

employeeRoutes.post(
  "/add-employee",
  HandleErrors(EMPLOYEE_CONTROLLER.addEmployee)
);

employeeRoutes.get(
  "/view-employees",
  HandleErrors(EMPLOYEE_CONTROLLER.viewEmployees)
);

employeeRoutes.delete(
  "/delete-employee",
  HandleErrors(EMPLOYEE_CONTROLLER.deleteEmployee)
);

employeeRoutes.get(
  "/get-details/:id",
  HandleErrors(EMPLOYEE_CONTROLLER.employeeDetails)
);

employeeRoutes.get("/posts", HandleErrors(EMPLOYEE_CONTROLLER.employeePosts));

employeeRoutes.post("/edit", HandleErrors(EMPLOYEE_CONTROLLER.editEmployee));
module.exports = { employeeRoutes };
