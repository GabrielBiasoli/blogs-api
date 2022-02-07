const { BlogPost } = require('../models');

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

module.exports = {
  create,
  findLastOne,
};
