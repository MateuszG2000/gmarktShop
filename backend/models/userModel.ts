import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    userData: {
      firstName: { type: String },
      lastName: { type: String },
      street: { type: String },
      houseNumber: { type: String },
      zipCode: { type: Number },
      city: { type: String },
      phoneNumber: { type: Number },
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
