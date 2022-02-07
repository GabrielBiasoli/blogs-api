const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, _next) => {
  const { user, statusCode } = req;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(user, JWT_SECRET, jwtConfig);

  res.status(statusCode).json({ token });
};