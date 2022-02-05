const { User } = require('../models');

const ALREADY_EXISTS_ERROR = new Error('User already registered');
ALREADY_EXISTS_ERROR.statusCode = 409;

const createUser = async (user) => {
  const { email } = user;
  const alreadyExists = await User.emailExists(email);
  if (alreadyExists) {
    throw ALREADY_EXISTS_ERROR;
  }
  const newUser = await User.createUser(user);
  return newUser;
};

module.exports = {
  createUser,
};