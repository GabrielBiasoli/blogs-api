const { User } = require('../models');

const ALREADY_EXISTS_ERROR = new Error('User already registered');
ALREADY_EXISTS_ERROR.statusCode = 409;

const INVALID_USER = new Error('Invalid fields');
INVALID_USER.statusCode = 400;

const USER_INEXISTENT = new Error('User does not exist');
USER_INEXISTENT.statusCode = 404;

const returnOptions = { 
  attributes: { exclude: ['password'] },
  raw: true, 
};

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

const getByEmail = async (email) => {
  const user = await User.findOne({ ...returnOptions, where: { email } });
  console.log(user);
  return user;
}; 

const getAll = async () => {
  const users = await User.findAll(returnOptions);
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, returnOptions);
  if (!user || !user.id) { throw USER_INEXISTENT; }
  return user;
};

module.exports = {
  createUser,
  login,
  getByEmail,
  getAll,
  getById,
};