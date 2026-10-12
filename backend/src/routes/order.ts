import { Router } from 'express';
import createOrder from '../controllers/order';
import validateOrderBody from '../validators/order';

const orderRouter = Router();

orderRouter.post('/', validateOrderBody, createOrder);

export default orderRouter;
