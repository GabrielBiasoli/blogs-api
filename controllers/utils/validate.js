module.exports = (scheema, body) => {
  const { error } = scheema.validate(body);
  if (error) throw error;
};
