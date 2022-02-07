const { User } = require('../models');

const ALREADY_EXISTS_ERROR = new Error('User already registered');
ALREADY_EXISTS_ERROR.statusCode = 409;

const INVALID_USER = new Error('Invalid fields');
INVALID_USER.statusCode = 400;

const createUser = async (user) => {
  const { email } = user;
  const alreadyExists = await User.emailExists(email);
  if (alreadyExists) {
    throw ALREADY_EXISTS_ERROR;
  }
  const newUser = { ...user };
  const userRegisted = await User.create(newUser);
  return userRegisted;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    throw INVALID_USER;
  }
  return user;
};

const getAll = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] },
    raw: true, 
  });
  return users;
};

module.exports = {
  createUser,
  login,
  getAll,
};