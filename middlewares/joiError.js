const joi = require('joi');

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) return next(err);
  console.log(err);

  return res.status(400).json({ message: err.message });
};