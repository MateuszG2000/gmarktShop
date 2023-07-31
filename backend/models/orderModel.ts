import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Order must have a products"],
        },
        quantity: Number,
      },
    ],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must have a client"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderModel);
module.exports = Order;
