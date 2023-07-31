import { NextFunction } from "connect";
import express from "express";

const jwt = require("jsonwebtoken");

const isAuth: ExpressFunction = async function (req, res, next) {
  const authHeader = req.cookies.Authorization;
  if (!authHeader) {
    const error: Error = new Error("Not authorizated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.trim();
  try {
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    res.userID = decodedToken.userId;
  } catch (err: any) {
    err.statusCode = 500;
    err.message = "Invalid Token";
    throw err;
  }
  next();
};
module.exports = isAuth;
