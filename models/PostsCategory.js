const associate = (models) => {
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: models.PostsCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });

  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: models.PostsCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
  {},
  {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostsCategory.associate = associate;

  return PostsCategory;
};