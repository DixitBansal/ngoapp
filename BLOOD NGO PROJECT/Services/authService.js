const db = require('../DB/connection');
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { config } = require('dotenv');




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

  const OTPVerify=async(req)=>{
    const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
    const client = require("twilio")(accountSid, authToken);
    let response={};
    await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+${req.query.phone}`, code: req.query.code })
        .then((verification_check) => {
            response.verification_check=verification_check;
        })
        response={...response,message:"User verified"};
        return response;

}
  
  const OTPsignup=async(req)=>{
    const exist=await checkPhoneExist(req);
    console.log(exist);
    if(exist){
        const response={
            success:false,
            message:"User already Exists try with different account"
        }
     return response;
    }
    else{

        const response=await sendOTP(req);
        return response;
    }
  }

  const ForgotPassOTP=async(req)=>{
    const exist=await checkPhoneExist(req);
  
    if(exist){
        const response=await sendOTP(req);
        return response;
    }
    else{
        const response={
            success:false,
            message:"account not found"
        }
        return response;
    }

  }

  module.exports={login,checkPhoneExist,sendOTP,OTPsignup,OTPVerify,ForgotPassOTP};