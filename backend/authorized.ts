import express from 'express';
const catchError = require('./utils/catchError');
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
const isAuth: ExpressFunction = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.cookies.Authorization;
  if (!authHeader) {
    const error: Error = new Error('Not authorizated.');
    error.statusCode = 401;
    console.log(error);
    throw error;
  }
  const token = authHeader.trim();
  try {
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (err: any) {
    err.statusCode = 500;
    err.message = 'Invalid Token';
    throw err;
  }
  next();
});
module.exports = isAuth;
