const Product = require("../models/product");
const Category = require("../models/category");
const axios = require("axios");
const https = require("https");

// ✅ GET PRODUCTS (USER + ADMIN)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to load products" });
  }
};

// ✅ IMPORT PRODUCTS (ADMIN)
exports.importProducts = async (req, res) => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(
      "https://dummyjson.com/products",
      { httpsAgent: agent }
    );

    const products = response.data.products;

    for (const p of products) {
      let category = await Category.findOne({ name: p.category });
      if (!category) category = await Category.create({ name: p.category });

      const exists = await Product.findOne({ name: p.title });
      if (exists) continue;

      await Product.create({
        name: p.title,
        description: p.description,
        price: p.price,
        category: category._id,
        stock: p.stock || 0,
        images: p.images || []
      });
    }

    res.json({ message: "Products imported successfully" });
  } catch (err) {
    res.status(500).json({ message: "Import failed" });
  }
};

// ✅ OPTIONAL (if you already have these)
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
