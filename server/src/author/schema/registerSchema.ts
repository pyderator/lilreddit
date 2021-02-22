import * as Joi from 'joi';

const registerSchema = Joi.object().keys({
  firstName: Joi.string().min(3).max(10).invalid('alert').required(),
  lastName: Joi.string().min(3).max(10).required(),
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().normalize().required(),
  password: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9!@#$&()-`.+,/\"]{3,}$/)
    .message('"password" must be a valid password')
    .required(),
});

export default registerSchema;
