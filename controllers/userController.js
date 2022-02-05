const joi = require('joi');
const rescue = require('express-rescue');
const userService = require('../services/userService');

const userScheema = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  image: joi.string(),
});

const validateBody = (body) => {
  const { error } = userScheema.validate(body);
  if (error) throw error;
};

const create = rescue(async (req, _res, next) => {
  validateBody(req.body);
  const { email } = req.body;
  const { id } = await userService.createUser(req.body);
  req.user = { email, id };
  return next();
});

module.exports = {
  create,
};