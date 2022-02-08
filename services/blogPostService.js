const { BlogPost, User, Category } = require('../models');

const POST_DOES_NOT_EXIST = new Error('Post does not exist');
POST_DOES_NOT_EXIST.statusCode = 404;

const UNAUTHORIZED_USER = new Error('Unauthorized user');
UNAUTHORIZED_USER.statusCode = 401;

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

const authorizeUser = async ({ userId, postId }) => {
  const currPostData = await getById(postId);
  if (currPostData.user.id !== userId) throw UNAUTHORIZED_USER;
};

const update = async (newData) => {
  const { postId, title, content } = newData;
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id: postId } },
  );
  const newPost = await BlogPost.findByPk(postId, {
    exclude: ['updated', 'published', 'id'],
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return newPost;
};

const remove = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  findLastOne,
  getAll,
  getById,
  authorizeUser,
  update,
  remove,
};
