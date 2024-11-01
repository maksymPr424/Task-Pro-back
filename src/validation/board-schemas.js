import Joi from 'joi';
import { BACKGROUND_LIST, ICON_LIST } from '../constants/board.js';

export const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().valid(...ICON_LIST),
  background: Joi.string().valid(...BACKGROUND_LIST),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...ICON_LIST),
  background: Joi.string().valid(...BACKGROUND_LIST),
});
