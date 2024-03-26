const Config = require('../models/configModel');
const catchError = require('../utils/catchError');
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';

export const createShipping = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newConfig = await Config.findOneAndUpdate(
    {},
    { $push: { shipping: req.body } },
    { upsert: true, new: true }
  );
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
    data: config[0],
  });
});
export const deleteShipping = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exists = await Config.findOne({ 'shipping._id': req.params.id });

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

export const updateMatchingOptions = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const matchingOptions = req.body;

  for (const key in matchingOptions) {
    if (matchingOptions.hasOwnProperty(key)) {
      const option = matchingOptions[key];

      if (
        typeof option === 'object' &&
        option.hasOwnProperty('isOn') &&
        !option.isOn
      ) {
        for (const field in option) {
          if (field !== 'isOn') {
            matchingOptions[key][field] = '';
          }
        }
      }
    }
  }

  const config = await Config.findOneAndUpdate(
    {},
    { matching: matchingOptions },
    { upsert: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: config,
  });
});

export const getMatchingOptions = catchError(async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const config = await Config.findOne();
  if (!config || !config.matching) {
    res.status(404).json({
      status: 'error',
      message: 'Matching options not found',
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    data: config.matching,
  });
});
