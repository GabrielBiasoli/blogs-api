const rescue = require('express-rescue');
const categoryScheema = require('./scheemas/categoryScheema');
const validate = require('./utils/validate');
const categoryService = require('../services/categoryService');

const create = rescue(async (req, res, _next) => {
  validate(categoryScheema, req.body);
  const category = await categoryService.create(req.body);

  res.status(201).json(category);
});

module.exports = {
  create,
};