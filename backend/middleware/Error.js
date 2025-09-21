import HandleError from "../utils/handleError.js";
export default (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal Server Error";
    // CastError
    if(err.name==="CastError"){
        const message=`This in invalid resource ${err.path}`;
        err=new HandleError(message,404)
    }
    // Duplicate key Error 
    if(err.code===11000){
const message=`This ${Object.keys(err.keyValue)} already registered.please login to continue`;
err=new HandleError(message,400)
    }
    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
        // message:err.stack
    })
}
