const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

// Admin-only routes
router.get("/", auth, adminOnly, getOrders);           // Get all orders
router.get("/:id", auth, adminOnly, getOrderById);    // Get order by ID
router.put("/:id", auth, adminOnly, updateOrder);     // Update order
router.delete("/:id", auth, adminOnly, deleteOrder);  // Delete order

module.exports = router;
//ading scomment

