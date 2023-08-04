const Product = require('../models/productModel');
const catchError = require('../utils/catchError');
const multer = require('multer');
import { RequestUser } from '../custom';
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, 'public/img/products');
  },
  filename: (req: RequestUser, file: any, cb: Function) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `product-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req: Request, file: any, cb: Function) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(Error('This is not an image'), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadPhoto = upload.single('photo');

export const createProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
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
