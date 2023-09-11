const Order = require('../models/orderModel');
const catchError = require('../utils/catchError');
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export const createOrder = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const orderNumber = `${req.body.user}-${timestamp}`;
  const newBody = { ...req.body, orderNumber };
  console.log(newBody);
  const newOrder = await Order.create(newBody);
  console.log(newOrder);
  res.status(201).json({
    status: 'success',
    data: newOrder,
  });
});
export const getOrder = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order = await Order.findById(req.params.id);

  if (!Order) {
    const error = new Error('There is no Order with given ID');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    data: order,
  });
});
export const getOrders = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const orders = await filter(Order.find(), req.query);
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: orders,
  });
});
export const getOrdersToUser = catchError(async function (
  req: Request,
  res: Response,
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

  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: orders,
  });
});
export const updateOrder = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    const error = new Error('There is no Order with given ID');
    error.statusCode = 404;
    next(error);
  }
  res.status(200).json({
    status: 'success',
    data: order,
  });
});
export const deleteOrder = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order = await Order.findByIdAndUpdate(req.params.id);
  if (!order) {
    const error = new Error('There is no Order with given ID');
    error.statusCode = 404;
    next(error);
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
