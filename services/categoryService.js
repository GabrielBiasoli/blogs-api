const { Category } = require('../models');

const create = async (category) => {
  const newCategory = await Category.create(category);

  return newCategory;
};

module.exports = {
  create,
};