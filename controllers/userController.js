const joi = require('joi');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const validateNewUser = require('./utils/validateNewUser');

const create = rescue(async (req, _res, next) => {
  validateNewUser(req.body);
  const { email } = req.body;
  const { id } = await userService.createUser(req.body);
  req.user = { email, id };
  return next();
});

module.exports = {
  create,
};