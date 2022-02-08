const rescue = require('express-rescue');
const blogPostScheema = require('./scheemas/blogPostScheema');
const validate = require('./utils/validate');
const blogPostService = require('../services/blogPostService');

const create = rescue(async (req, _res, next) => {
  validate(blogPostScheema, req.body);
  const { id } = req.user;

  await blogPostService.create({ ...req.body, userId: id });
  
  const newPost = await blogPostService.findLastOne();
  req.newPost = newPost;
  next();
});

const getAll = rescue(async (req, res, _next) => {
  const posts = await blogPostService.getAll();
  res.status(200).json(posts);
});

module.exports = {
  create,
  getAll,
};