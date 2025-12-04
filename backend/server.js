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
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed for form submissions
app.use(express.static("public")); // For static files like CSS/JS/images

// Set EJS as view engine
app.set("view engine", "ejs");

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => res.send("API is running..."));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);

// --- ADMIN DASHBOARD ROUTES --- // Admin dashboard, products, categories, users

// --- Render product cards page ---
app.get("/products", async (req, res) => {
  const Product = require("./models/product");
  try {
    const products = await Product.find();
    res.render("products", { products }); // Render products.ejs
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 404 Handler
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
