const associate = (models) => {
  models.User.hasMany(models.BlogPost,
    { foreignKey: 'userId', as: 'blogPosts' });
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = associate;

  User.createUser = async (user) => {
    const newUser = await User.create(user);
    return newUser;
  };

  User.emailExists = async (email) => User.findOne({ where: { email } });

  return User;
};