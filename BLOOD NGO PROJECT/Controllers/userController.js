const User=require('../models/user')
const AuthService=require('../Services/authService')
const userLogin=async(req,res)=>{
    const response=await AuthService.login(req);
    res.status(200).send(response);
}

const OTPSignup=async(req,res)=>{
    const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
    const client = require("twilio")(accountSid, authToken);
    client.verify.v2
    .services(verifySid)
    .verifications.create({ to: `+${req.query.phone}`, channel: req.query.channel })
    .then((verification) => {
       res.status(200).send(verification);

    })

}
const OTPVerify=async(req,res)=>{
    const accountSid = "ACb6de2b21cc658da998e90e47dbf4fa8b";
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = "VA1141b074b9f4746323daef40fdeeb6c5";
    const client = require("twilio")(accountSid, authToken);
    client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+${req.query.phone}`, code: req.query.code })
        .then((verification_check) => {
            res.status(200).send(verification_check);
        })

}
const checkPhone=async(req,res)=>{
    const checkphone=await AuthService.checkPhoneExist(req);
   if(checkphone){
    res.status(200).send("exits");
   }
   else{
    res.status(200).send("does not exits");
   }
}

const forgotPass=async(req,res)=>{
    // console.log("checkphone=",AuthService.checkPhoneExist(req));
    const response=await AuthService.forgotPass(req);
    res.status(200).send(response);
   
    
}


const userSignup = async (req, res,next) => {
    // console.log(req.body);
    try{
        const response = await AuthService.signUp(req.body);
        console.log("response=",response);
  
        res.send(response);
    }
    catch (error) {
                const errorToThrow = new Error();
                switch (error?.code) {
                    case '23505':
                        errorToThrow.message = 'User already exists';
                        errorToThrow.statusCode = 403;
                        break;
                    default:
                        errorToThrow.statusCode = 500;
                        
                }
                //pass error to next()
                next(errorToThrow);
            }
    
   
  };
module.exports={userLogin,userSignup,OTPSignup,OTPVerify,forgotPass,checkPhone}