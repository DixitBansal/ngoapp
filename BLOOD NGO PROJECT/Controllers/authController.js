
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
    const response={
        message:"exists",
        success:true
    }
    res.status(200).send(response);
   }
   else{
    const response={
        message:"not found",
        success:false
    }
    res.status(404).send(response);
   }
}


const OTPforgotPass=async(req,res)=>{
    const response=await AuthService.ForgotPassOTP(req);
    res.status(200).send(response);
}

module.exports={OTPforgotPass,checkPhone,OTPVerify,OTPSignup,userLogin};