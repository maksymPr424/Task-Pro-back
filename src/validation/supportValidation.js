import Joi from 'joi';

export const supportRequestSchema = Joi.object({
  userEmail: Joi.string().email().min(5).max(254).required(),
  comment: Joi.string().min(10).max(500).required(),
});
