import Joi from '@hapi/joi';

export default Joi.object()
  .keys({
    name: Joi.string()
      .required(),
    password: Joi.array().items(Joi.string())
      .required(),
  });
