// const joi = require('joi');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const validateUser = require('./utils/validate');
const userScheema = require('./scheemas/userScheema');

const create = rescue(async (req, _res, next) => {
  validateUser(userScheema, req.body);
  const { email } = req.body;
  const { id } = await userService.createUser(req.body);
  req.user = { email, id };
  req.statusCode = 201;
  return next();
});

const login = rescue(async (req, _res, next) => {
  validateUser(userScheema, req.body);
  const { email, password } = req.body;
  const { id } = await userService.login(email, password);
  req.user = { email, id }; 
  req.statusCode = 200;
  return next();
});

const getAll = rescue(async (_req, res, _next) => {
  const users = await userService.getAll();

  res.status(200).json(users);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  res.status(200).json(user);
});

const removeUser = rescue(async (req, res, _next) => {
  const { id } = req.user;
  await userService.removeUser(id);
  res.status(204).end();
});

module.exports = {
  create,
  login,
  getAll,
  getById,
  removeUser,
};