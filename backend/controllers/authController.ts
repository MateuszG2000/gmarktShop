const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
import express from "express";
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
export function signup(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err: Error = new Error("Validation error");
    err.statusCode = 422;
    err.data = error.mapped();
    throw err;
  }
  const email: string = req.body.email;
  const name: string = req.body.name;
  const password: string = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword: string) => {
      const user: User = new User({
        email: email,
        name: name,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result: onSave) => {
      res.status(201).json({
        message: "User created",
        userID: result._id,
      });
    })
    .catch((err: any) => {
      throw err;
    });
}
export function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const login = req.body.email;
  const password = req.body.password;
  let currentUser: User;
  User.findOne({ email: login })
    .then((user: User) => {
      if (!user) {
        const error = new Error("Incorrect login or password.");
        error.statusCode = 401;
        throw error;
      }
      currentUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result: boolean) => {
      if (!result) {
        const error = new Error("Incorrect login or password.");
        error.statusCode = 401;
        throw error;
      }
      if (req.cookies.Authorization) {
        res.status(200).json({
          message: "You are already logged in",
          token: req.cookies.Authorization,
        });
      }
      const token = jwt.sign(
        { email: currentUser.email, userId: currentUser._id.toString() },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      res
        .cookie("Authorization", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .json({
          message: "success",
          token: token,
        });
    })

    .catch((err: any) => {
      next(err);
    });
}
export function gets(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  User.find().then((user: any) => {
    res.status(200).json({
      status: "success",
      message: "success fetch",
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
    .cookie("Authorization", "", {
      httpOnly: true,
      maxAge: 1000,
    })
    .status(200)
    .json({
      status: "success",
      message: "Logged out",
    });
}
