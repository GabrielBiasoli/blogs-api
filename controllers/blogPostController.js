const rescue = require('express-rescue');
const blogPostScheema = require('./scheemas/blogPostScheema');
const postUpdateScheema = require('./scheemas/postUpdateScheema');
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

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const post = await blogPostService.getById(id);

  res.status(200).json(post);
});

const update = rescue(async (req, res, _next) => {
  validate(postUpdateScheema, req.body);
  const { user, body, params } = req;
  const { id } = params;
  const updatedPost = await blogPostService.update({ userId: user.id, ...body, postId: id });
  res.status(200).json(updatedPost);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
};