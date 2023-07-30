"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      reguire: true,
    },
    lastName: {
      type: String,
      reguire: true,
    },
    street: {
      type: String,
      reguire: true,
    },
    houseNumber: {
      type: Number,
      reguire: true,
    },
    zipCode: {
      type: Number,
      reguire: true,
    },
    City: {
      type: String,
      reguire: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const User = mongoose_1.default.model("User", userSchema);
module.exports = User;
