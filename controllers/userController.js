// const joi = require('joi');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const validateUser = require('./utils/validateUser');

const create = rescue(async (req, _res, next) => {
  validateUser(req.body);
  const { email } = req.body;
  const { id } = await userService.createUser(req.body);
  req.user = { email, id };
  req.statusCode = 201;
  return next();
});

const login = rescue(async (req, res, next) => {
  validateUser(req.body);
  const { email, password } = req.body;
  const { id } = await userService.login(email, password);
  req.user = { email, id }; 
  req.statusCode = 200;
  next();
});

module.exports = {
  create,
  login,
};