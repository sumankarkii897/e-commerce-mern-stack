import { Route } from "express";
import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
dotenv.config({path:'backend/config/config.env'})
connectMongoDatabase();
// handle uncaught exception errr
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errr`);
    process.exit(1);
    
    
})
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