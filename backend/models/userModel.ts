import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
      zipCode: { type: String },
      city: { type: String },
      phoneNumber: { type: Number },
      email: { type: String },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    status: {
      type: String,
      default: 'active',
      enum: {
        values: ['active', 'inactive'],
        message: 'Status can be only active or inactive',
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
