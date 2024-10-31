import Joi from 'joi';

export const supportRequestSchema = Joi.object({
  userEmail: Joi.string().email().required(),
  comment: Joi.string().min(10).required(),
});
