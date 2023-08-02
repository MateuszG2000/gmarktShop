import mongoose, { Query } from 'mongoose';
const Product = require('../models/productModel');
interface IOrder extends Document {
  orderNumber: number;
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
  userId: mongoose.Types.ObjectId;
  paid: boolean;
  sent: boolean;
}
const orderModel = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    orderProducts: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: Product,
          required: [true, 'Order must have a products'],
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must have a client'],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
orderModel.pre(/^find/, function (next) {
  const query = this as Query<IOrder, IOrder>;
  query
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt',
    })
    .populate({
      path: 'orderProducts.product',
      select: '-__v -createdAt -updatedAt -description',
    });
  next();
});
const Order = mongoose.model('order', orderModel);
module.exports = Order;
