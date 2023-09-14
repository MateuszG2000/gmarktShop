import mongoose from 'mongoose';

const configModel = new mongoose.Schema({
  shipping: [
    {
      name: {
        type: String,
        requried: true,
      },
      company: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      cashOnDelivery: {
        type: Boolean,
      },
    },
  ],
});

const Config = mongoose.model('config', configModel);
module.exports = Config;
