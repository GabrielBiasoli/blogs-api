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

module.exports = {
  create,
};