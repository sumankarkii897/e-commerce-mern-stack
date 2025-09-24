import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router(); // creates new router object by using this we can easily handle HTTP request
// Routes
router.route("/products").get(getAllProducts)
router.route("/admin/product/create").post(verifyUserAuth ,roleBasedAccess("admin"), createProducts);
router
.route("/product/:id")
  .put(verifyUserAuth,roleBasedAccess("admin"),updateProduct)
  .delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct)
  .get(verifyUserAuth,getSingleProduct);
export default router;
