import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 70,
      require: true,
      unique: true,
    },

    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    inStock: {
      type: Number,
      require: true,
      min: 0,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
