const { BlogPost, User, Category } = require('../models');

const create = async ({ title, content, userId }) => {  
  const blogPost = {
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  };
  await BlogPost.create(blogPost);
};

const findLastOne = async () => {
  const lastOne = await BlogPost.findOne({ order: [['id', 'DESC']] });
  return lastOne.dataValues;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });
  return posts;
};

module.exports = {
  create,
  findLastOne,
  getAll,
};
