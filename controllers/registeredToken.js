const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, _next) => {
  const { user, statusCode } = req;

  const token = jwt.sign(user, JWT_SECRET);

  res.status(statusCode).json({ token });
};