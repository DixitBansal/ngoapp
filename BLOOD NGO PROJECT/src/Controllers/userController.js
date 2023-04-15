const User=require('../models/user')
const UserService=require('../Services/userService');

const updatePass=async(req,res)=>{
    const response=await UserService.UpdatePass(req);
    res.status(200).send(response);   
}
const getUserData=async(req,res)=>{
    console.log(req.query.user_id);
    const response=await UserService.getUserDetails(req.query.user_id);
    res.status(200).send(response);
}

const userSignup = async (req, res,next) => {
    try{
        const response = await UserService.signUp(req.body);
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
                next(errorToThrow);
            }
    
   
  };
module.exports={userSignup,updatePass,getUserData};