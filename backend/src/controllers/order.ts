import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { total, items } = req.body;

  try {
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== new Set(items).size) {
      next(new BadRequestError('Один или несколько товаров не найдены'));
      return;
    }

    if (products.some((product) => product.price === null)) {
      next(new BadRequestError('В заказе есть товары не для продажи'));
      return;
    }

    const prices = new Map(
      products.map((product) => [product._id.toString(), product.price]),
    );

    const calculatedTotal = items.reduce(
      (sum: number, id: string) => sum + (prices.get(id) ?? 0),
      0,
    );

    if (calculatedTotal !== total) {
      next(new BadRequestError('Неверная сумма заказа'));
      return;
    }

    res.status(200).send({
      id: randomUUID(),
      total: calculatedTotal,
    });
  } catch (error) {
    next(error);
  }
};
export default createOrder;
