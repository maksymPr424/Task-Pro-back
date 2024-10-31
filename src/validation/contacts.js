import Joi from 'joi';

export const createTaskSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    'string.base': 'Task title should be a string',
    'string.min': 'Task title should have at least {#limit} characters',
    'string.max': 'Task title should have at most {#limit} characters',
    'any.required': 'Task title is required',
  }),

  content: Joi.string().min(0).max(512).messages({
    'string.base': 'Task content should be a string',
    'string.min': 'Task content should have at least {#limit} characters',
    'string.max': 'Task content should have at most {#limit} characters',
    'any.required': 'Task content is required',
  }),

  labelColor: Joi.string()
    .valid('grey', 'violet', 'green', 'pink')
    .required()
    .default('grey')
    .messages({
      'any.only':
        'Task label must be one of the following colors: grey, violet, green, pink',
      'any.required': 'Task label is required',
    }),

  priority: Joi.string()
    .valid('none', 'low', 'medium', 'high')
    .required()
    .default('none')
    .messages({
      'any.only':
        'Task priority must be one of the following: grey, violet, green, pink',
      'any.required': 'Task priority is required',
    }),
  deadline: Joi.date().default(
    () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  ), // Дата по умолчанию — через сутки
});

export const updateTaskSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),

  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Task content should be a string',
    'string.min': 'Task content should have at least {#limit} characters',
    'string.max': 'Task content should have at most {#limit} characters',
  }),

  email: Joi.string().email().messages({
    'string.email':
      'Email must be a valid email address, e.g., example@example.com',
  }),

  TaskType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Task type must be one of the following: work, home, personal',
  }),
})
  .or('name', 'phoneNumber', 'email', 'isFavourite', 'TaskType')
  .messages({
    'object.missing':
      'At least one field (name, phoneNumber, email, isFavourite, or TaskType) must be provided',
  });
