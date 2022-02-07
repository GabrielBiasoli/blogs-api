const { BlogPost } = require('../models');

const create = async ({ title, content, userId }) => {  
  const blogPost = {
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  };
  console.log(blogPost);
  await BlogPost.create(blogPost);
};

const findLastOne = async () => {
  const lastOne = await BlogPost.findOne({ order: [['id', 'DESC']] });
  console.log(lastOne);
  return lastOne.dataValues;
};

module.exports = {
  create,
  findLastOne,
};
