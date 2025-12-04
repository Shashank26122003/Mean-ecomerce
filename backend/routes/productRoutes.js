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

// ✅ PUBLIC ROUTE (USER fetch)
router.get("/", getProducts);

// ✅ ADMIN IMPORT (MUST come before :id)
router.post("/import", auth, adminOnly, importProducts);

// ✅ ADMIN CRUD
router.post("/", auth, adminOnly, createProduct);
router.put("/:id", auth, adminOnly, updateProduct);
router.delete("/:id", auth, adminOnly, deleteProduct);

// ✅ SINGLE PRODUCT (MUST be last)
router.get("/:id", getProductById);

module.exports = router;
