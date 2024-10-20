import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'))
    .required()
    .messages({
      'string.base': 'Phone number should be string',
      'string.pattern.base': 'Phone number should be in correct format',
      'any.required': 'Phone number is required',
    }),
  isFavorite: Joi.boolean().required().messages({
    'boolean.base': 'IsFavorite should be boolean',
    'any.required': 'IsFavorite is required',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be either work, home, or personal',
      'any.required': 'Contact type is required',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email should be a string',
  }),
});
