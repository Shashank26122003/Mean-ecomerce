const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes"); // Added user routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => res.send("API is running..."));

// API Routes
app.use("/api/auth", authRoutes);               // Register/Login
app.use("/api/products", productRoutes);       
app.use("/api/categories", categoryRoutes);    
app.use("/api/orders", orderRoutes);           // User & admin orders
app.use("/api/admin/orders", adminOrderRoutes); // Admin-only orders
app.use("/api/cart", cartRoutes);              // User cart
app.use("/api/users", userRoutes);            // User management routes

// 404 Handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
