const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Config = require('../models/configModel');
const catchError = require('../utils/catchError');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
import mongoose from 'mongoose';
import { RequestUser, fileRequest } from '../custom';
import filter from '../utils/filteringMethods';
import { Request, Response, NextFunction } from 'express';
import getUserMatchingData from '../utils/getUserMatchingData';
import calculateWeights from '../utils/calculateWeights';
import { getRandomCategory } from '../utils/getRandomCategory';

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, 'public/img/products');
  },
  filename: (req: RequestUser, file: any, cb: Function) => {
    const ext = file.mimetype.split('/')[1];
    const filename = file.originalname.replace(`.${ext}`, '').replace('jpg', '');
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

export const createProduct = async function (req: fileRequest, res: Response, next: NextFunction) {
  try {
    req.body.image = req.file?.filename;
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newProduct,
    });
  } catch (err) {
    if (!req.file) {
      const error = new Error('No file');
      error.statusCode = 400;
      return next(error);
    }
    const error = new Error('Wrong input data');
    error.statusCode = 400;

    return next(error);
  }
};
export const getProduct = catchError(async function (req: Request, res: Response, next: NextFunction) {
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
export const getProductsMatch = catchError(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.cookies['persist%3Aroot']) {
    await getProducts(req, res, next);
    return;
  }
  const decodedCookieValue = decodeURIComponent(req.cookies['persist%3Aroot']);
  let data, user;
  data = JSON.parse(decodedCookieValue);
  user = JSON.parse(data.user);
  if (user && user.userId) {
    const orders = await Order.find({ user: user.userId }).sort({
      createdAt: -1,
    });
    let historyProducts = orders.flatMap((order: { orderProducts: any }) => order.orderProducts);
    historyProducts = historyProducts.map((item: { product: any; quantity: string }) => {
      const { _id, name, price, inStock, image, category } = item.product;
      return {
        _id,
        name,
        price,
        inStock,
        image,
        category,
        quantity: item.quantity,
      };
    });
    data = {
      cart: data.cart,
      user: data.user,
      historyProducts: historyProducts,
    };
  }

  const categories = [
    {
      name: 'phones',
      weight: 5,
    },
    {
      name: 'pcs',
      weight: 5,
    },
    {
      name: 'headphones',
      weight: 5,
    },
    {
      name: 'accessories',
      weight: 5,
    },
    {
      name: 'laptops',
      weight: 5,
    },
    {
      name: 'monitors',
      weight: 5,
    },
  ];
  const userMatchingData = getUserMatchingData(data);
  const config: IConfig = (await Config.findOne()).matching;
  const weights = calculateWeights(userMatchingData, config, categories);
  const query = { ...req.query };
  query.inStock = { gt: '0' };
  let products: any = [];
  //
  if (config.basketPriceOptions.isOn && userMatchingData.averagePriceInCart) {
    if (config.basketPriceOptions.quantity == 'more') {
      const randomRecords = await filter(Product.find(), {
        price: {
          lt: userMatchingData.averagePriceInCart + config.priceDeviation * config.basketPriceOptions.weight,
          gt: userMatchingData.averagePriceInCart - config.priceDeviation * config.basketPriceOptions.weight,
        },
        limit: 50,
      });
      products.push(...randomRecords);
    } else if (config.basketPriceOptions.quantity == 'less') {
      const randomRecords = await Product.find({
        $or: [
          {
            price: {
              $gt: userMatchingData.averagePriceInCart + config.priceDeviation * config.basketPriceOptions.weight,
            },
          },
          {
            price: {
              $lt: userMatchingData.averagePriceInCart - config.priceDeviation * config.basketPriceOptions.weight,
            },
          },
        ],
      }).limit(50);
      products.push(...randomRecords);
    }
  }
  if (config.historyPriceOptions.isOn && userMatchingData.averagePriceInHistory) {
    if (config.historyPriceOptions.quantity == 'more') {
      const randomRecords = await filter(Product.find(), {
        price: {
          lt: userMatchingData.averagePriceInHistory + config.priceDeviation * config.historyPriceOptions.weight,
          gt: userMatchingData.averagePriceInHistory - config.priceDeviation * config.historyPriceOptions.weight,
        },
        limit: 50,
      });
      products.push(...randomRecords);
    } else if (config.historyPriceOptions.quantity == 'less') {
      const randomRecords = await Product.find({
        $or: [
          {
            price: {
              $gt: userMatchingData.averagePriceInHistory + config.priceDeviation * config.historyPriceOptions.weight,
            },
          },
          {
            price: {
              $lt: userMatchingData.averagePriceInHistory - config.priceDeviation * config.historyPriceOptions.weight,
            },
          },
        ],
      }).limit(50);
      products.push(...randomRecords);
    }
  }

  products = [...new Set(products)];
  let finalProducts: any = [];

  while (query.limit && products.length < query.limit) {
    const randomCategory = getRandomCategory(weights);
    const randomRecord = await Product.aggregate([{ $match: { category: randomCategory } }, { $sample: { size: 1 } }]);
    const existsInProducts = products.some((product: any) => product.name === randomRecord[0].name);
    if (!existsInProducts) {
      products.push(...randomRecord);
    }
    finalProducts = products;
  }
  if (query.limit && products.length > query.limit) {
    while (finalProducts.length < query.limit) {
      const randomCategory = getRandomCategory(weights);
      const objectToRemove = [...products].find((product) => product.category === randomCategory);
      console.log(products.length);
      products = products.filter((product: any) => product.name !== objectToRemove.name);
      finalProducts.push(objectToRemove);
    }
  }
  res.status(200).json({
    status: 'success',
    results: finalProducts.length,
    data: finalProducts,
  });
});
export const getProducts = catchError(async function (req: Request, res: Response, next: NextFunction) {
  const query = { ...req.query };
  query.inStock = { gt: '0' };
  const products = await filter(Product.find(), query);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});
export const updateProduct = catchError(async function (req: Request, res: Response, next: NextFunction) {
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

export const deleteProduct = catchError(async function (req: Request, res: Response, next: NextFunction) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    const error = new Error('There is no product with given ID');
    error.statusCode = 404;
    return next(error);
  }

  const imagePath = path.join(process.cwd(), 'public', 'img', 'products', product.image);
  fs.unlink(imagePath, (err: Error) => {});

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
interface Option {
  isOn: boolean;
  quantity: string;
  category?: string | null;
  price?: number | null;
  weight: number;
}
interface OptionPrice {
  isOn: boolean;
  quantity: string;
  weight: number;
}

interface City {
  name: string;
  weight: number;
  quantity: string;
  category: string;
  _id: string;
}

interface IConfig {
  maleOptions: Option;
  femaleOptions: Option;
  basketCategoryOptions: Option;
  basketPriceOptions: OptionPrice;
  historyCategoryOptions: Option;
  historyPriceOptions: OptionPrice;
  cities: City[];
  priceDeviation: number;
}
