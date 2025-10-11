import express  from "express";
import product from "./routes/productRoutes.js"
import errorHandleMiddleware from "./middleware/Error.js"
import user from "./routes/userRoutes.js"
import order from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser";
import fileUpload  from "express-fileupload";
const app=express();
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
// Route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use(errorHandleMiddleware)
export default app;
