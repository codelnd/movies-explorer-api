const { mongoose } = require('mongoose');
const { regExpLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExpLink.test(value),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExpLink.test(value),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExpLink.test(value),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports.Movie = mongoose.model('movie', movieSchema);
