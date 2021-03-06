const joi = require('joi');

module.exports = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  image: joi.string(),
});
