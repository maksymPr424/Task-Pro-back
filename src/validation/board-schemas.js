import Joi from 'joi';
import { BACKGROUND_LIST, ICON_LIST } from '../constants/board.js';

export const addBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Board title should be a string',
    'string.min': 'Board title should have at least {#limit} characters',
    'string.max': 'Board title should have at most {#limit} characters',
    'any.required': 'Board title is required',
  }),
  icon: Joi.string().valid(...ICON_LIST),
  background: Joi.string().valid(...BACKGROUND_LIST),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...ICON_LIST),
  background: Joi.string().valid(...BACKGROUND_LIST),
});
