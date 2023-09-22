import bodyParser from 'body-parser';
import express from 'express';
import authRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import path from 'path';
import configRoutes from './routes/configRoutes';

const helmet = require('helmet');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config({ path: './config.env' });
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: ['https://www.gsklep.gjda.pl', 'https://gsklep.gjda.pl'],
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
app.use('/api/config', configRoutes);

app.use(
  //Error handling
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.code === 11000) {
      error.message = 'Duplicate` fields, correct your request';
      error.statusCode = 400;
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((el: any) => el.message);

      error.message = `Invalid input data. ${errors.join('. ')}`;
      error.statusCode = 400;
    }
    const status = error.statusCode || 500;
    const message = error.message || 'Unknown error';
    // const data = error.data || '';
    // res.status(status).json({
    //   status: status,
    //   error: error,
    // message: message,
    //   stack: error.stack,
    // });
    res.status(status).json({
      status: status,
      message: message,
    });
  }
);

module.exports = app;
