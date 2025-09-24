const express = require("express");
const router = express.Router();
const { getProducts, getProductById,getProductsByCategory,addProduct,deleteAllProducts,addProductsBulk } = require("../controllers/productController");




router.get("/",getProducts)
router.get("/category/:category",getProductsByCategory)
router.get("/:id",getProductById)
router.post("/", addProduct);
router.post("/bulk", addProductsBulk);
router.delete("/", deleteAllProducts);


module.exports = router