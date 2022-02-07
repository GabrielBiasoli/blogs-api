const joi = require('joi');

module.exports = joi.object({
  title: joi.required(),
  content: joi.required(),
  categoryIds: joi.required(),
});