const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userService = require('../../services/userService');

const { JWT_SECRET } = process.env;

const TOKEN_NOT_FOUND = new Error('Token not found');
TOKEN_NOT_FOUND.statusCode = 401;

const INVALID_TOKEN = new Error('Expired or invalid token');
INVALID_TOKEN.statusCode = 401;

const jwtConfig = { algorithms: ['HS256'] };

module.exports = rescue(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw TOKEN_NOT_FOUND;
  }
  try {
    const token = req.headers.authorization;
    const { email } = await jwt.verify(token, JWT_SECRET, jwtConfig);

    const user = await userService.getByEmail(email);
    if (!user) { throw Error; }
  } catch (error) {
    return next(INVALID_TOKEN);
  }

  return next();
});