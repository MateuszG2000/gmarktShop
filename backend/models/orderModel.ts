import { timeStamp } from "console";
import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      require: true,
    },
    products: [{ productId: String, quantity: Number, price: Number }],
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderModel);
module.exports = Order;
