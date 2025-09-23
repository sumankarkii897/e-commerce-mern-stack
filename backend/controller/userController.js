import handleAsyncError from "../middleware/handleAsyncError.js"
import User from "../models/userModel.js"
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
export const registerUser=handleAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is temp id",
            url:"This is temp url"
        }
    })
    sendToken(user,201,res)
})

// login
export const loginUser=handleAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new HandleError("Email or Password cannot be empty",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new HandleError("Invalid Email or Password ",401))
    }
    const isPasswordValid=await user.verifyPassword(password);
    if(!isPasswordValid){
 return next(new HandleError("Invalid Email or  Password ",401))
    }
    sendToken(user,200,res)
})
// logout 
export const logout=handleAsyncError(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Sucessfully Logged Out ..."

    })
})
// Forgot Password
export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{
    // destructuring
    const {email}=req.body
    const user=await User.findOne({email})
    if(!user){
        return next(new HandleError("User doesn't exit",400))
    }
    let resetToken;
    try {
        resetToken=user.generatePasswordResetToken()
        await user.save({validateBeforeSave:false})
        
    } catch (error) {

        // console.log(error.message);
        return next(new HandleError("Could not save reset Token please try again later",500))
        
    }
    const resetPasswordURL=`http://localhost/api/v1/reset/${resetToken}`
    // console.log(resetPasswordURL);
    const message=`Use the following link to reset the password ${resetPasswordURL}. \n\n This link will be expired in 30 minutes. \n If you didn't request a password reset request,Please ignore this message`;
    try {
        // Send Email
        await sendEmail({
            email:user.email,
            subject:"Password Reset Request",
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is send to ${user.email} Sucessuflly`
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})
        console.log(error.message);
         
        return next(new HandleError("Email Could not be sent. please try again later",500))
    }
    
})
// Reset Password
export const resetPassword=handleAsyncError(async(req,res,next)=>{
    // console.log(req.params.token);
    
const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest("hex");
const user=await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
})
//30 min for token expire
if(!user){
    return next(new HandleError("Reset Password Token is invalid or had been expired",400))
}
const {password,confirmPassword}=req.body;
if(password!==confirmPassword){
    return next(new HandleError("Password doesn't match",400))
}
user.password=password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
sendToken(user,200,res)
})
// get user details
export const getUserDetails=handleAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    console.log(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
    
    
})
// Updating the password
export const updatePassword=(handleAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body
    const user = await User.findById(req.user.id).select("+password")
    const checkPasswordMatch=await user.verifyPassword(oldPassword)
    if(!checkPasswordMatch){
        return next(new HandleError("Old Password does not match",400))
    }
    if(newPassword!==confirmPassword){
         return next(new HandleError("Password does not match",400))
    }
    user.password=newPassword
await user.save();
sendToken(user,200,res)
}))
//updating user profile
export const updateProfile=handleAsyncError(async(req,res,next)=>{
const {name,email}=req.body;
const updateUserDetails={
    name,
    email
}
const user=await User.findByIdAndUpdate(req.user.id,updateUserDetails,{
    new:true,
    runValidators:true
})
res.status(200).json({
    success:true,
    message:"Profile Updated Successfully..",
    user
})
})