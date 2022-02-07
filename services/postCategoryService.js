const { PostsCategory } = require('../models');
const categoryService = require('./categoryService');

const CATEGORY_NOT_FOUND = new Error('"categoryIds" not found');
CATEGORY_NOT_FOUND.statusCode = 400;

const create = async ({ categoryIds, postId }) => {
  const categoriesPromises = categoryIds.reduce((acc, curr) => {
    const categoryPromise = categoryService.categoryExists(curr);
    return [...acc, categoryPromise];
  }, []);
  const categories = await Promise.all(categoriesPromises);
  
  const allCategoriesExist = categories.every((cat) => cat);
  if (!allCategoriesExist) throw CATEGORY_NOT_FOUND;

  const postCategoriesPromises = categoryIds.reduce((acc, curr) => {
    const promise = PostsCategory.create({ categoryId: curr, postId });
    return [...acc, promise]; 
  }, []);

  await Promise.all(postCategoriesPromises);
};

module.exports = {
  create,
};