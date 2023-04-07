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

 const getUserDetails=async(params)=>{
    const user_id=params;
    console.log(user_id);
    const {rows}=await db.query(
        `SELECT * FROM users WHERE id=$1`,[user_id]
    );
    let response={};
    const user_data=rows[0];
    if(user_data){
        response={
            success:true,
            data:user_data,
            message:"Data found"
        }
        return response;
    }
    else{
        response={
            success:false,
            message:"Data not found"
        }
        return response;
    }
 }


  module.exports={signUp,UpdatePass,getUserDetails};