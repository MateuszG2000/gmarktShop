import mongoose from 'mongoose';

const configModel = new mongoose.Schema({
  shipping: [
    {
      name: {
        type: String,
        required: true,
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
  matching: {
    maleOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    femaleOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    cityOptions: {
      cityAdd: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    basketCategoryOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    basketPriceOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    historyCategoryOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    historyPriceOptions: {
      isOn: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    },
    cities: {
      type: Array,
      required: true,
    },
  },
});

const Config = mongoose.model('config', configModel);
module.exports = Config;
