const Product = require('../models/productModel');
const catchError = require('../utils/catchError');
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';
export const createProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newProduct,
  });
});
export const getProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error('There is no product with given ID');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
export const getProducts = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const products = await filter(Product.find(), req.query);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});
export const updateProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    const error = new Error('There is no product with given ID');
    error.statusCode = 404;
    next(error);
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
export const deleteProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await Product.findByIdAndUpdate(req.params.id);
  if (!product) {
    const error = new Error('There is no product with given ID');
    error.statusCode = 404;
    next(error);
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
