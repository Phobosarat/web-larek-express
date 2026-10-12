import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import validateProductBody from '../validators/product';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateProductBody, createProduct);

export default productRouter;
