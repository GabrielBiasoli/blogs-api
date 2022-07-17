# Project Blogs API

This project was designed to provide a backend for a blog.

It's a CRUD(Create, Read, Update, Delete) based API made using _Node.js_ with _Express_ and _MySQL_.

## Used stacks

**Language:** _Node.js_, _MySQL_.

**Tools:** Express, Sequelize, Joi, JWT.

## Environment variables

To run this project, you will need to add the following environment variables to your .env

`MYSQL_HOST`

`MYSQL_USER`

`HOSTNAME`

`PORT`

## Running locally

Clone the project:

```bash
  git clone https://github.com/GabrielBiasoli/blogs-api.git
```

Enter the directory:

```bash
  cd blogs-api
```

Install the dependencies:

```bash
  npm install
```

Start the server

```bash
  npm start
```

## API Dcumentation

#### Creating a new user

```http
  POST /users
```

Request body must contain the following structure:

```JSON
{
  "displayName": "string123",
  "email": "string@string.com",
  "password": "123456",
  "image": "path"
}
```

Response must return a token:

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

##

#### Logging in with an user

```http
  POST /login
```

A valid user must be used in the request body, sending the following structure:

```JSON
{
  "email": "string@string.com",
  "password": "123456"
}
```

Response must return a token:

```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

###  IMPORTANT: The following endpoints must contain a valid token as request header's Authorization key.

#### Listing all users

```http
  GET /user
```


##

#### Listing a specific user

```http
  GET /user/${id}
```

| Param | Type     | Description                                           |
| :---- | :------- | :---------------------------------------------------- |
| `id`  | `string` | **Mandatory** - Id from the user you want to consult |

##

#### Registering a category

```http
  POST /categories
```

Request body must contain the following structure:

```JSON
  {
    "name": "Comedy",
  }
```

##

#### Listing all categories

```http
  GET /categories
```

##

#### Creating a post

```http
  POST /post
```

Request body must contain the following structure:

```JSON
{
  "title": "Latest updates",
  "content": "The whole post text...",
  "categoryIds": [1, 2]
}
```

With the numbers in the array being category ids.

##

#### Listing all posts

```http
  GET /post
```

##

#### Searching for a specific post by its Id

```http
  GET /post/${id}
```

| Param | Type     | Description                                           |
| :---- | :------- | :---------------------------------------------------- |
| `id`  | `string` | **Mandatory** - Id from the post you want to consult |

##

#### Searching for posts by their title or content

```http
  GET /post/search?q=:searchTerm
```

| Param | Type     | Description                                           |
| :---- | :------- | :---------------------------------------------------- |
| `searchTerm`  | `string` | **Mandatory** - It can be the title or part of the content post |

##

#### Updating a specific post

```http
  PUT /post/${id}
```

| Param | Type     | Description                                           |
| :---- | :------- | :---------------------------------------------------- |
| `id`  | `string` | **Mandatory** - Id from the post you want to update |


**Observations:**

- The endpoint must receive an Id from the blog post to be updated. It will only be updated if it was the user who created the post

- Only the post's title and content can be updated

Request body must contain the following structure:

```JSON
{
  "title": "Latest updates",
  "content": "The whole post text...",
}
```

##

#### Deleting a specific post

```http
  DELETE /post/${id}
```

| Param | Type     | Description                                           |
| :---- | :------- | :---------------------------------------------------- |
| `id`  | `string` | **Mandatory** - Id from the post you want to delete |


**Observation:**

- The endpoint must receive an Id from the blog post to be deleted. It will only be deleted if it was the user who created the post

##

#### Deleting the logged user

```http
  DELETE /user/me
```

**Observation:**

- This endpoint will delete the logged user by using his token

##
