const { Category } = require('../models');

const categoryExists = async (categoryId) => {
  const category = await Category.findByPk(categoryId);

  return category;
}; 

const create = async (category) => {
  const newCategory = await Category.create(category);

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll({ raw: true });

  return categories;
};

module.exports = {
  create,
  getAll,
  categoryExists,
};