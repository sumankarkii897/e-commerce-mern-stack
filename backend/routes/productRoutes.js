import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router(); // creates new router object by using this we can easily handle HTTP request
// Routes
router.route("/products").get(getAllProducts).post(createProducts);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);
export default router;
