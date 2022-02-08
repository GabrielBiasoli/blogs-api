const { BlogPost, User, Category } = require('../models');

const POST_DOES_NOT_EXIST = new Error('Post does not exist');
POST_DOES_NOT_EXIST.statusCode = 404;

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

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });
  if (!post) throw POST_DOES_NOT_EXIST;
  return post;
};

module.exports = {
  create,
  findLastOne,
  getAll,
  getById,
};
