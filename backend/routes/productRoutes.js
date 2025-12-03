const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  importProducts
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);           // Get all products
router.get("/:id", getProductById);    // Get product by ID

// Admin-only routes
router.post("/", auth, adminOnly, createProduct);      // Create product manually
router.put("/:id", auth, adminOnly, updateProduct);   // Update product
router.delete("/:id", auth, adminOnly, deleteProduct);// Delete product
router.post("/import", auth, adminOnly, importProducts); // Import products from API

module.exports = router;
