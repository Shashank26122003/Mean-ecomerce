const axios = require("axios");
const Product = require("../models/product");
const Category = require("../models/category");

// URL of external API
const EXTERNAL_API_URL = "https://dummyjson.com/products"; // replace with actual endpoint

// Function to import products
const importProducts = async () => {
  try {
    const response = await axios.get(EXTERNAL_API_URL);
    const products = response.data.products || response.data; // handle if response is array or object
    console.log(response.data.proudct,response.data);
    for (const p of products) {
      // Check if category exists, else create
      let category = await Category.findOne({ name: p.category });
      if (!category) {
        category = await Category.create({ name: p.category });
      }

      // Check if product already exists by name
      const existingProduct = await Product.findOne({ name: p.title });
      if (existingProduct) continue; // skip duplicates

      // Create product
      await Product.create({
        name: p.title,
        description: p.description,
        price: p.price,
        category: category._id,
        stock: p.stock || 0,
        images: p.images || [],
      });
    }

    console.log("Products imported successfully!");
  } catch (error) {
    console.error("Error importing products:", error.message);
  }
};

module.exports = importProducts;
