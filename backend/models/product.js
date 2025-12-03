const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    description: String,
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    stock: {
        type: Number,
        default: 0,
    },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
