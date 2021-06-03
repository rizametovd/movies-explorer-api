const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/404-not-found-error');
const { Auth } = require('../middlewares/auth');
const { onSignOut } = require('../controllers/users');

const routes = express.Router();

routes.use('/users', Auth, usersRoutes);
routes.use('/movies', Auth, moviesRoutes);
routes.use('/signout', Auth, onSignOut);
routes.use('*', () => {
  throw new NotFoundError('Не туда!!!');
});

exports.routes = routes;
