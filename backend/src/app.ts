import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import path from 'path';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS } from './config';

const app = express();


app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.get('/', (req, res) => {
  res.send('WebLarek Express API is running!');
});

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
