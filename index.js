require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { joiError, domainError, serverError } = require('./middlewares');
const User = require('./controllers/userController');
const getToken = require('./controllers/signToken');
const validateToken = require('./controllers/auth/validateToken');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', User.create, getToken);
app.post('/login', User.login, getToken);
app.get('/user', validateToken, User.getAll);

// Error middlewares
app.use(joiError);
app.use(domainError);
app.use(serverError);
