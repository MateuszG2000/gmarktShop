import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import path from 'path';

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './config.env' });
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

//routes

app.use(
  '/api/images',
  express.static(path.join(__dirname, '..', 'public', 'img', 'products'))
);

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);

app.use(
  //Error handling
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const message = error.message || 'Unknown error';
    const status = error.statusCode || 500;
    const data = error.data || '';
    res.status(status).json({
      status: status,
      error: error,
      message: message,
      stack: error.stack,
    });
  }
);

module.exports = app;
