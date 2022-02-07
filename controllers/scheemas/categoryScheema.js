const joi = require('joi');

module.exports = joi.object({
  name: joi.required(),
});