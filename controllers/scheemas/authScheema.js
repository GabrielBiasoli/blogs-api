const joi = require('joi');

module.exports = joi.object({
  authorization: joi.required(),
});