const Product = require('../models/productModel');
const catchError = require('../utils/catchError');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
import mongoose from 'mongoose';
import { RequestUser, fileRequest } from '../custom';
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, 'public/img/products');
  },
  filename: (req: RequestUser, file: any, cb: Function) => {
    const ext = file.mimetype.split('/')[1];
    const filename = file.originalname
      .replace(`.${ext}`, '')
      .replace('jpg', '');
    cb(null, `product-${filename}-${Date.now()}.${ext}`);
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

export const createProduct = async function (
  req: fileRequest,
  res: Response,
  next: NextFunction
) {
  try {
    req.body.image = req.file?.filename;
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newProduct,
    });
  } catch (err) {
    const file = req.file!.filename;
    const filePath = req.file!.destination;
    const filePathFull = path.join(__dirname, '..', '..', filePath, file);
    fs.unlink(filePathFull, (err: Error) => {
      if (!err) return;
      const error = new Error('Img path - something wrong');
      return next(error);
    });
    console.log(err);

    return next(err);
  }
};
export const getProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  let product;
  if (isValidObjectId) {
    product = await Product.findById(req.params.id);
  }
  if (!product) {
    const error = new Error('Brak produktu o podanym ID');
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
  const product = await Product.findByIdAndDelete(req.params.id);
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
