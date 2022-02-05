module.exports = (err, _req, res, next) => {
  if (!err.statusCode) return next(err);

  const { statusCode, message } = err;

  res.status(statusCode).json({ message }); 
};