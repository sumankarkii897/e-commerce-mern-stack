import express  from "express";
import dotenv from "dotenv";
import product from "./routes/productRoutes.js"
import errorHandleMiddleware from "./middleware/Error.js"
import user from "./routes/userRoutes.js"
import order from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser";
import fileUpload  from "express-fileupload";
import path from "path";

import { fileURLToPath } from "url";
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
// Route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
/* server static file */
app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(errorHandleMiddleware)
if(process.env.NODE_ENV!=='PRODUCTION'){
dotenv.config({path:'backend/config/config.env'})
}
export default app;
