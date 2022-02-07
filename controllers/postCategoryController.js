const rescue = require('express-rescue');
const postCategoryService = require('../services/postCategoryService');

const create = rescue(async (req, res, _next) => {
  const { categoryIds } = req.body;
  const { newPost: { id: postId }, newPost } = req;

  await postCategoryService.create({ categoryIds, postId });

  res.status(201).json(newPost);
});

module.exports = {
  create,
};