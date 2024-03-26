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
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      category: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    femaleOptions: {
      isOn: {
        type: Boolean,
        required: true,
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      category: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    basketCategoryOptions: {
      isOn: {
        type: Boolean,
        required: true,
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    basketPriceOptions: {
      isOn: {
        type: Boolean,
        required: true,
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    historyCategoryOptions: {
      isOn: {
        type: Boolean,
        required: true,
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    historyPriceOptions: {
      isOn: {
        type: Boolean,
        required: true,
        default: false,
      },
      quantity: {
        type: String,
        required: true,
        default: null,
      },
      weight: {
        type: String,
        required: true,
        default: null,
      },
    },
    cities: [
      {
        name: {
          type: String,
          required: true,
          default: null,
        },
        weight: {
          type: String,
          required: true,
          default: null,
        },
        quantity: {
          type: String,
          required: true,
          default: null,
        },
        category: {
          type: String,
          required: true,
          default: null,
        },
      },
    ],
  },
});

const Config = mongoose.model('config', configModel);
module.exports = Config;
