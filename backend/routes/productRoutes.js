const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  addProduct,
  deleteAllProducts,
  addProductsBulk
} = require("../controllers/productController");

// Get all products
router.get("/", getProducts);

// Get products by category (specific route first)
router.get("/category/:category", getProductsByCategory);

// Get product by ID (dynamic route last)
router.get("/:id", getProductById);

// Add a single product
router.post("/", addProduct);

// Add multiple products in bulk
router.post("/bulk", addProductsBulk);

// Delete all products
router.delete("/", deleteAllProducts);

module.exports = router;
