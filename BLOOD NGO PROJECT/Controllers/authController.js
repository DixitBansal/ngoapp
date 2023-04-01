
const AuthService=require('../Services/authService');
const userLogin=async(req,res)=>{
    const response=await AuthService.login(req);
    res.status(200).send(response);
}

const OTPSignup=async(req,res)=>{
    const response=await AuthService.OTPsignup(req);
    res.status(200).send(response);
}

const OTPVerify=async(req,res)=>{
    const response=await AuthService.OTPVerify(req);
    res.status(200).send(response);
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


const OTPforgotPass=async(req,res)=>{
    const response=await AuthService.ForgotPassOTP(req);
    res.status(200).send(response);
}

module.exports={OTPforgotPass,checkPhone,OTPVerify,OTPSignup,userLogin};