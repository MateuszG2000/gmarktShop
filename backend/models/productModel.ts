import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 70,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          'pcs',
          'monitors',
          'laptops',
          'headphones',
          'phones',
          'accessories',
        ],
        message:
          'Category must be: pcs, monitors, laptops, headphones, phones or accessories',
      },
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('product', productSchema);
module.exports = Product;
