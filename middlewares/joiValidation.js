const { celebrate, Joi } = require('celebrate');
const { regExpLink } = require('../utils/constants');

module.exports.registerJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(regExpLink),
    password: Joi.string().required(),
  }),
});

module.exports.loginJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(regExpLink),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(regExpLink),
  }),
});

module.exports.createMovieJoiValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regExpLink),
    trailerLink: Joi.string().required().regex(regExpLink),
    thumbnail: Joi.string().required().regex(regExpLink),
    owner: Joi.string().hex().length(24),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieJoiValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
