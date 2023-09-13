const Config = require('../models/configModel');
const catchError = require('../utils/catchError');
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';

export const createShipping = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newConfig = await Config.findOneAndUpdate(
    {},
    { $push: { shipping: req.body } },
    { upsert: true, new: true }
  );
  console.log(newConfig);
  res.status(201).json({
    status: 'success',
    data: newConfig,
  });
});
export const getConfig = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const config = await filter(Config.find(), req.query);
  res.status(200).json({
    status: 'success',
    data: config,
  });
});
export const deleteShipping = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exists = await Config.findOne({ 'shipping._id': req.params.id });
  console.log(exists);

  if (!exists) {
    const error = new Error('There is no shipping with given ID');
    error.statusCode = 404;
    next(error);
  } else {
    const config = await Config.findByIdAndUpdate(
      '6501e07b737b837b483398ce',
      { $pull: { shipping: { _id: req.params.id } } },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: config,
    });
  }
});
