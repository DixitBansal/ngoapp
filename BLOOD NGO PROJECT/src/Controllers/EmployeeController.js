const EMPLOYEE_SERVICES = require("../Services/employeeServices");
const { signUp } = require("../Services/userService");

const addEmployee = async (req, res) => {
  const response = await EMPLOYEE_SERVICES.addEmployee(req.body);
  console.log("response=", response);
  res.status(200).send(response);
};
const viewEmployees = async (req, res) => {
  const response = await EMPLOYEE_SERVICES.viewallEmployee(req.query);
  res.status(200).send(response);
};
const deleteEmployee = async (req, res) => {
  const response = await EMPLOYEE_SERVICES.deleteEmployee(req.query);
  res.status(200).send(response);
};

const employeeDetails = async (req, res) => {
  const resposne = await EMPLOYEE_SERVICES.getEmployeeDetails(req.params.id);
  res.status(200).send(resposne);
};

const editEmployee = async (req, res) => {
  const response = await EMPLOYEE_SERVICES.editEmployee(req.body);
  res.status(200).send(response);
};

module.exports = {
  addEmployee,
  viewEmployees,
  deleteEmployee,
  employeeDetails,
  editEmployee,
};
