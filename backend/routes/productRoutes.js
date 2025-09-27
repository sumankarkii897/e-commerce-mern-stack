import express from "express";
import {
  createProducts,
  createReviewForProduct,
  deleteProduct,
  deleteReview,
  getAdminProduct,
  getAllProducts,
  getReview,
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
  router.route("/review").put(verifyUserAuth,createReviewForProduct).get(getReview)
  router.route("/reviews").get(getReview).delete(verifyUserAuth,deleteReview)
  router.route("/admin/products").get(verifyUserAuth,roleBasedAccess("admin"),getAdminProduct)
export default router;
