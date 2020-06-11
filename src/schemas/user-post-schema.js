import Joi from '@hapi/joi';

export default Joi.object()
  .keys({
    login: Joi.string()
      .required(),
    password: Joi.string()
      .pattern(/(?=.*[0-9])(?=.*[a-zA-Z])/)
      .required(),
    age: Joi.number()
      .integer()
      .min(4)
      .max(130)
      .required(),
  });
