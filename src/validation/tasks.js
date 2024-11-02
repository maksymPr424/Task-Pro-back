import Joi from 'joi';

export const createTaskSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    'string.base': 'Task title should be a string',
    'string.min': 'Task title should have at least {#limit} characters',
    'string.max': 'Task title should have at most {#limit} characters',
    'any.required': 'Task title is required',
  }),

  content: Joi.string().min(0).max(1024).optional().messages({
    'string.base': 'Task content should be a string',
    'string.min': 'Task content should have at least {#limit} characters',
    'string.max': 'Task content should have at most {#limit} characters',
    'any.required': 'Task content is required',
  }),

  // column: Joi.string()
  //   .valid('To Do', 'In Progress', 'Done')
  //   .default('To Do')
  //   .required(),

  priority: Joi.string()
    .valid('none', 'low', 'medium', 'high')
    .default('none')
    .required()
    .messages({
      'any.only':
        'Task priority must be one of the following: none, low, medium, high',
      'any.required': 'Task priority is required',
    }),

  deadline: Joi.date()
    .iso()
    .greater('now')
    .required()
    .default(() => new Date(Date.now() + 24 * 60 * 60 * 1000)) // default date - 24 hours
    .messages({
      'date.greater': 'Deadline must be in the future',
    }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  priority: Joi.string().valid('none', 'low', 'medium', 'high').optional(),
  deadline: Joi.date().iso().greater('now').optional().messages({
    'date.greater': 'Deadline must be in the future',
  }),
  // column: Joi.string().valid('To Do', 'In Progress', 'Done').optional(),
  columnId: Joi.string().hex().length(24).optional().messages({
    'string.length': 'Column ID must be a valid 24-character ObjectId',
  }),
}).min(1); // 1 field at least for update
