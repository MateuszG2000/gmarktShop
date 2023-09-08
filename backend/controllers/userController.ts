const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const catchError = require('../utils/catchError');
import express, { NextFunction } from 'express';
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
import { RequestUser } from '../custom';
import { Address } from 'cluster';
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
  userData.userType = 'user';
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
  let user: User = await User.findOne({ email: login }).select('+password');

  if (!user) {
    const error = new Error('Incorrect login or password.');
    error.statusCode = 400;
    throw error;
  }
  const passwordResult = await bcrypt.compare(password, user.password);

  if (!passwordResult) {
    const error = new Error('Incorrect login or password.');
    error.statusCode = 400;
    throw error;
  }

  if (req.cookies.Authorization) {
    return res.status(200).json({
      message: 'You are already logged in',
      token: req.cookies.Authorization,
    });
  }
  user.password = undefined;
  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    process.env.PRIVATE_KEY,
    { expiresIn: '1h' }
  );

  res
    .cookie('Authorization', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    .cookie('AuthConfirm', token, {
      maxAge: 1000 * 60 * 60,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
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
export const getUser = catchError(async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let userId;
  try {
    const token = req.cookies.Authorization.trim();
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    userId = decodedToken.userId;
  } catch (err: any) {
    err.statusCode = 400;
    err.message = 'Invalid Token';
    throw err;
  }
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('There is no user with given ID');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
export const AddAddress = catchError(async function (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const address = {
    ...req.body,
  };
  let userId;
  try {
    const token = req.cookies.Authorization.trim();
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    userId = decodedToken.userId;
  } catch (err: any) {
    err.statusCode = 400;
    err.message = 'Invalid Token';
    throw err;
  }
  const actualAddress = await User.findById(userId, 'userData');
  if (actualAddress.userData.length >= 3) {
    const error = new Error('To many addresses');
    error.statusCode = 400;
    throw error;
  }
  actualAddress.userData.push(address);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { userData: actualAddress.userData } },
    { runValidators: true, new: true }
  );

  if (!updatedUser) {
    const error = new Error('Something went wrong');
    error.statusCode = 500;
    throw error;
  }
  res.status(200).json({
    status: 'success',
  });
});
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
    .cookie('AuthConfirm', '', {
      httpOnly: true,
      maxAge: 1000,
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Logged out',
    });
}
export function refreshToken(
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
export const isAuth = (...userTypes: String[]) =>
  catchError(
    async (
      req: RequestUser,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const authHeader = req.cookies.Authorization;
      if (!authHeader) {
        const error: Error = new Error('Not authorizated.');
        error.statusCode = 401;
        throw error;
      }
      const token = authHeader.trim();
      let userId;
      try {
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        userId = decodedToken.userId;
      } catch (err: any) {
        err.statusCode = 400;
        err.message = 'Invalid Token';
        throw err;
      }
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        const error: Error = new Error("User dosen't exists");
        error.statusCode = 400;
      }

      req.user = currentUser;
      if (!userTypes.includes(currentUser.userType)) {
        const error: Error = new Error(
          `You do not have permission. Your account is ${currentUser.userType} type.`
        );
        error.statusCode = 401;
        return next(error);
      }
      next();
    }
  );
export const updatePassword = catchError(async function (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  let userId;
  try {
    const token = req.cookies.Authorization.trim();
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    userId = decodedToken.userId;
  } catch (err: any) {
    err.statusCode = 400;
    err.message = 'Invalid Token';
    throw err;
  }
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const userPassword = await User.findById(userId, 'password');
  const passwordResult = await bcrypt.compare(password, userPassword.password);

  if (!passwordResult) {
    const error = new Error('Wrong user password');
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  let user: User = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { runValidators: true }
  ).select('+password');

  if (!user) {
    const error = new Error('Something went wrong');
    error.statusCode = 500;
    throw error;
  }
  res.status(200).json({
    status: 'success',
  });
});
