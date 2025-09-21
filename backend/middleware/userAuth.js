import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const verifyUserAuth=handleAsyncError(async (req,res,next)=>{
    const {token}=req.cookies;
    console.log(token);
    if(!token){
        return next(new HandleError("Authenticatio is missing. Plese Login to access resource",401))
    }
    // verifty token
    const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY)
    
    req.user=await User.findById(decodedData.id);
    next();
})