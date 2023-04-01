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
    // console.log(hashedPassword);
    // password=hashedPassword;
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

  const checkPhoneExist=async(req)=>{
    const phone=req.query.phone;
    const {rows}=await db.query(
        `SELECT * FROM USERS WHERE phone=$1`,[phone]
    )
        console.log(rows[0]);
    if(rows[0]!=undefined){
        return true;
    }
    else{
        return false;
    }

  }
  

  const login = async (req) => {
    const { phone,password } = req.query;
    // const phone=req.query.phone;
    // const password=req.query.password;
  
    const { rows } = await db.query(
        `SELECT * FROM USERS WHERE phone=$1`,[phone]
    );
    // console.log("rows=",rows[0].id);
    const usersData=rows[0];
    console.log("usersdata=",usersData);
    let res = {};
  
    if (usersData) {
      // match password
      const isPasswordMatch = await bcrypt.compare(
        password.trim(),
        usersData.password
      );
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>isPasswordMatch", isPasswordMatch);
  
      if (isPasswordMatch) {
        // const token = await createToken(usersData);
  
        res = {
          success: true,
          message: "User Log in successfully.",
          data: { ...usersData },
        };
        
      } else {
        res = {
          success: false,
          message: "Incorrect password.",
        };
      }
    } 
    else {
      res = {
        success: false,
        message: `No User found with phone number ${phone}.`,
        status:404
      };
    }
    return res;
  };

  const forgotPass=async(params)=>{
    // const exist=await checkPhoneExist(req);
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

  const sendOTP=async(req)=>{
    let res={};
    const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
    const client = require("twilio")(accountSid, authToken);
    await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: `+${req.query.phone}`, channel: req.query.channel })
    .then((verification) => {
        console.log(verification);
       res["verification"]=verification;

    })
    res={...res,message:"OTP send Successdfully",success:true};
    return res;
  }
  

  module.exports={signUp,login,checkPhoneExist,forgotPass,sendOTP};