const express = require("express");
const router = express.Router();
const { auth, adminOnly } = require("../middleware/authMiddleware");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// Create order → only authenticated users
router.post("/", auth, createOrder);

// Get all orders → only admin
router.get("/", auth, adminOnly, getOrders);

// Get single order → admin or owner (you can add logic in controller)
router.get("/:id", auth, getOrderById);

// Update order → only admin
router.put("/:id", auth, adminOnly, updateOrder);

// Delete order → only admin
router.delete("/:id", auth, adminOnly, deleteOrder);

module.exports = router;
