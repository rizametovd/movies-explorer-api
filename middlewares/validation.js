const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');

function validateLink(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Заполните поле валидным URL');
}

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const validateUserUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateLink),
    trailer: Joi.string().required().custom(validateLink),
    nameRU: Joi.string().required().pattern(/[\dа-я\sё]+$/i),
    nameEN: Joi.string().required().pattern(/\w+$/i),
    thumbnail: Joi.string().required().custom(validateLink),
    movieId: Joi.number().integer(),
    owner: Joi.string().hex().length(24),
  }),
});

const validateRemoveMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserUpdateProfile,
  validateCreateMovie,
  validateRemoveMovie,
};
