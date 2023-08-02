const Order = require('../models/orderModel');
const catchError = require('../utils/catchError');
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';
export const createOrder = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrder = await Order.create(req.body);
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
    data: Order,
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
