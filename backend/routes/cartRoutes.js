const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController");

// All routes require authenticated users
router.use(auth);

// Get current user's cart
router.get("/", getCart);

// Add item to cart
router.post("/add", addToCart);

// Update item quantity
router.put("/update", updateCartItem);

// Remove item from cart
router.delete("/remove", removeCartItem);

// Clear entire cart
router.delete("/clear", clearCart);

module.exports = router;
