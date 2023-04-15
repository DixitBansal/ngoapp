const express=require('express');
const EMPLOYEE_CONTROLLER=require('../Controllers/EmployeeController');
const employeeRoutes=express.Router();
const { HandleErrors } = require('../middlewares/handleError');
employeeRoutes.post("/add-employee",HandleErrors(EMPLOYEE_CONTROLLER.addEmployee));
employeeRoutes.get("/view-employees",HandleErrors(EMPLOYEE_CONTROLLER.viewEmployees));
employeeRoutes.delete("/delete-employee",HandleErrors(EMPLOYEE_CONTROLLER.deleteEmployee));
module.exports={employeeRoutes};