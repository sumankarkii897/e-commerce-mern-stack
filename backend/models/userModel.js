import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from "crypto"
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please Enter your name"],
    maxLength:[25,"Name can't be exceed then 25 character"],
    minLength:[3,"Name Should contain more then 3 characters"]
},
email:{
    type:String,
    requred:[true,"Please Enter your Email"],
    unique:true,
    validate:[validator.isEmail,"Please Enter Valid Email"]
},
password:{
    type:String,
    required:[true,"Please Enter Your Password"],
    minLength:[8,"Password must be of atleast 8 characters"],
    select:false // if admin is not user we should not display password to admin

},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
role:{
    type:String,
    default:"user"
},
resetPasswordToken:String,
resetPasswordExpire:Date
},{
    timestamps:true
})
// Password hashing

userSchema.pre("save",async function(next){
    // 1st scenario -> updating profie (name,email,image) --> hashed password will be hashed again
    // 2nd scenario => update password
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,parseInt(process.env.SALT_ROUND))
    next()
})
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
userSchema.methods.verifyPassword=async function(userEnteredPassword){
return await bcrypt.compare(userEnteredPassword,this.password);

}
// generating token
userSchema.methods.generatePasswordResetToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+30*60*1000 // 30 minute
    return resetToken;
  
}
export default mongoose.model("User",userSchema)