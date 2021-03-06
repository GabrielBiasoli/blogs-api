require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { joiError, domainError, serverError } = require('./middlewares');
const User = require('./controllers/userController');
const Category = require('./controllers/categoryController');
const BlogPost = require('./controllers/blogPostController');
const PostsCategory = require('./controllers/postCategoryController');
const getToken = require('./controllers/signToken');
const validateToken = require('./controllers/auth/validateToken');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', User.create, getToken);
app.post('/login', User.login, getToken);
app.get('/user', validateToken, User.getAll);
app.get('/user/:id', validateToken, User.getById);
app.post('/categories', validateToken, Category.create);
app.get('/categories', validateToken, Category.getAll); 
app.post('/post', validateToken, BlogPost.create, PostsCategory.create);
app.get('/post', validateToken, BlogPost.getAll);
app.get('/post/search', validateToken, BlogPost.search);
app.get('/post/:id', validateToken, BlogPost.getById);
app.put('/post/:id', validateToken, BlogPost.authorizeUser, BlogPost.update);
app.delete('/post/:id', validateToken, BlogPost.authorizeUser, BlogPost.remove);
app.delete('/user/me', validateToken, User.removeUser);

// Error middlewares
app.use(joiError);
app.use(domainError);
app.use(serverError);
