import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),

  boardId: Joi.string().hex().length(24).required().messages({
    'string.length': 'Board ID must be a valid 24-character ObjectId',
  }),
});
