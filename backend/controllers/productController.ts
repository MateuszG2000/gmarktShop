const Product = require("../models/productModel");
const catchError = require("../utils/catchError");
import { Request, Response, NextFunction } from "express";
export const createProduct = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});
export const getProduct: ExpressFunction = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error("There is no product with given ID");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
});
