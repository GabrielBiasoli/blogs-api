const userScheema = require('../scheemas/userScheema');

module.exports = (body) => {
  const { error } = userScheema.validate(body);
  if (error) throw error;
};
