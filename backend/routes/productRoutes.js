import express from "express";
import {
  createProducts,
  createReviewForProduct,
  deleteProduct,
  getAdminProduct,
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
.route("/admin/product/:id")
  .put(verifyUserAuth,roleBasedAccess("admin"),updateProduct)
  .delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct)
  
  router.route("/product/:id").get(getSingleProduct);
  router.route("/review").put(verifyUserAuth,createReviewForProduct);
  router.route("/admin/products").get(verifyUserAuth,roleBasedAccess("admin"),getAdminProduct)
export default router;
