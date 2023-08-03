const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const catchError = require('../utils/catchError');
import express from 'express';
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

export function signup(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err: Error = new Error('Error');
    err.statusCode = 422;
    err.data = error.mapped();
    throw err;
  }

  const { password, passwordConfirm, ...userData } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword: string) => {
      userData.password = hashedPassword;
      const user: User = new User(userData);
      return user.save();
    })
    .then((result: onSave) => {
      res.status(201).json({
        message: 'User created',
        userID: result._id,
      });
    })
    .catch((err: any) => {
      throw err;
    });
}
export const login = catchError(async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const login = req.body.email;
  const password = req.body.password;
  let currentUser: User;
  let user: User = await User.findOne({ email: login }).select('+password');

  if (!user) {
    const error = new Error('Incorrect login or password.');
    error.statusCode = 401;
    throw error;
  }
  currentUser = user;
  const passwordResult = await bcrypt.compare(password, user.password);

  if (!passwordResult) {
    const error = new Error('Incorrect login or password.');
    error.statusCode = 401;
    throw error;
  }
  if (req.cookies.Authorization) {
    return res.status(200).json({
      message: 'You are already logged in',
      token: req.cookies.Authorization,
    });
  }
  const token = jwt.sign(
    { email: currentUser.email, userId: currentUser._id.toString() },
    process.env.PRIVATE_KEY,
    { expiresIn: '1h' }
  );
  res
    .cookie('Authorization', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    })
    .status(200)
    .json({
      message: 'success',
      token: token,
    });
});

export function getUsers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  User.find().then((user: any) => {
    res.status(200).json({
      status: 'success',
      results: user.length,
      user: user,
    });
  });
}
export function logOut(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res
    .cookie('Authorization', '', {
      httpOnly: true,
      maxAge: 1000,
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Logged out',
    });
}
