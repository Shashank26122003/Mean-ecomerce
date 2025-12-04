const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Shopkart";
    //const mongoURI="mongodb://localhost:27017/Shopkart";
    await mongoose.connect(mongoURI, { dbName: "Shopkart" });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
