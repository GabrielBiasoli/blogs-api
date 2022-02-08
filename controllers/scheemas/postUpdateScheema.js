const joi = require('joi');

module.exports = joi.object({
  title: joi.required(),
  content: joi.required(),
}).messages({
  'object.unknown': 'Categories cannot be edited',
});