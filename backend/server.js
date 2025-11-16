import { Route } from "express";
import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
if(process.env.NODE_ENV!=='PRODUCTION'){
dotenv.config({path:'backend/config/config.env'})
}
import {v2 as cloudinary} from "cloudinary"
connectMongoDatabase();
/* setting cloudinary */
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
// handle uncaught exception errr
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errr`);
    process.exit(1);
    
    
})
app.post("/api/verify-esewa", async (req, res) => {
  const { amt, pid, refId } = req.body; // Data from frontend

  try {
    const params = new URLSearchParams({
      amt,
      rid: refId,
      pid,
      scd: "EPAYTEST", // Sandbox merchant code
    });

    const response = await axios.post(
      "https://uat.esewa.com.np/epay/transrec",
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (response.data.includes("<response_code>Success</response_code>")) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while verifying payment" });
  }
});
const port=process.env.PORT || 3000;

const server=app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`);
    
})
// checking for uncaught Exception
// console.log(myName);

// handling promising rejection error
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Server is Shutting down,due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1)
    })
    
    
})