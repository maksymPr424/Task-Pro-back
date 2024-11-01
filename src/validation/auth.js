import Joi from "joi";

export const registrationUserSchema=Joi.object({
name:Joi.string().min(2).max(32).required(),
email:Joi.string().email().required(),
password:Joi.string().min(8).max(64).required(),
});

export const loginUserSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
});
