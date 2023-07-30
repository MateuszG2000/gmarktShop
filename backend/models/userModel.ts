import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    user: {
      email: { type: String, require: true },
      firstName: { type: String, require: true },
      lastName: { type: String, require: true },
      street: { type: String, require: true },
      houseNumber: { type: String, require: true },
      zipCode: { type: Number, require: true },
      city: { type: String, require: true },
      phoneNumber: { type: Number, require: true },
    },
    password: {
      type: { type: String, require: true },
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
