const EMPLOYEE_SERVICES=require('../Services/employeeServices');
const { signUp } = require("../Services/userService");

const addEmployee=async(req,res)=>{
    const response = await signUp(req.body);
    console.log("response=",response);
    res.status(200).send(response);
}
const viewEmployees=async(req,res)=>{
    const response=await EMPLOYEE_SERVICES.viewallEmployee(req.query);
    res.status(200).send(response);
}
module.exports={addEmployee,viewEmployees};