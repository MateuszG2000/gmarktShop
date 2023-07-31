import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
    },
    products: [{ productId: String, quantity: Number, price: Number }],
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderModel);
module.exports = Order;
