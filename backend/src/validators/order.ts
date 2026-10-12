import { celebrate, Joi, Segments } from 'celebrate';

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string()
      .valid('card', 'online')
      .required(),

    email: Joi.string()
      .email()
      .required(),

    phone: Joi.string().trim().min(1).required(),

    address: Joi.string().trim().min(1).required(),

    total: Joi.number().min(0).required(),

    items: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
  }),
});

export default validateOrderBody;
