import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
const User = require('../models/userModel');

export const validateEmail = [
  body('email')
    .isEmail()
    .withMessage('Not Valid e-mail')
    .custom((value) => {
      return User.findOne({ email: value }).then(
        (user: Promise<void> | null) => {
          if (user) {
            return Promise.reject('E-Mail address already exists!');
          }
        }
      );
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 8 }),
  body('passwordConfirm')
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match"),
];
