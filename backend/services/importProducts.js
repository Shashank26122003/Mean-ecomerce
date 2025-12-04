const axios = require("axios");
const https = require("https");
const Product = require("../models/product");
const Category = require("../models/category");

const EXTERNAL_API_URL = "https://dummyjson.com/products";

const importProducts = async () => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.get(EXTERNAL_API_URL, { httpsAgent: agent });
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
        images: p.images || [],
      });
    }

    console.log("Products imported successfully!");
  } catch (err) {
    console.error("Error importing products:", err.message);
  }
};

module.exports = importProducts;
