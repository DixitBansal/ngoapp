const db = require('../DB/connection');
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { config } = require('dotenv');

const signUp = async (userData) => {
    console.log("signup");
    console.log("data=",userData)
    const { username, password, phone,email } = userData;
  
    const data = {
      username,
      password,
      phone,
      email 
    };
  
    let res = {};
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({username, password:hashedPassword,phone,email});
    const result = await user.createUser();
    console.log("result=",result);
    if (result) {
        res = {
            success: true,
            message: "Added user successfully.",
        };
        } else {
        res = {
            success: false,
            message: "Something went wrong.",
        };
        }
        return res;
  };

  const UpdatePass=async(params)=>{
    const phone=params.query.phone;
    const newpass=params.query.pass;
    const hashedPassword = await bcrypt.hash(newpass, 8);
    let res={};
    const {rowCount}=await db.query(
        `UPDATE users SET password = $1 WHERE phone=$2`,[hashedPassword,phone]
    );
    console.log(rowCount);
    if (rowCount>=1) {
        res = {
            success: true,
            message: "password updated successfully",
        };
        } else{
        res = {
            success: false,
            message: "Something went wrong.",
        };
        }
        return res;
  }

 


  module.exports={signUp,UpdatePass};