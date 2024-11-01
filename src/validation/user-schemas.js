import Joi from 'joi';
import {
  emailRegExp,
  nameRegExp,
  passwordRegExp,
} from '../constants/user-constants.js';

export const userSignUpValidationSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(nameRegExp).required(),
  email: Joi.string().min(6).max(32).pattern(emailRegExp).required(),
  password: Joi.string().min(8).max(64).pattern(passwordRegExp).required(),
});

export const userSignInValidationSchema = Joi.object({
  email: Joi.string().min(6).max(32).pattern(emailRegExp).required(),
  password: Joi.string().min(8).max(64).pattern(passwordRegExp).required(),
});

export const userUpdateValidationSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(nameRegExp),
  email: Joi.string().min(6).max(32).pattern(emailRegExp),
  password: Joi.string().min(8).max(64).pattern(passwordRegExp),
  theme: Joi.string().valid('light', 'dark', 'violet'),
});
