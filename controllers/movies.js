const { Movie } = require('../models/user');

module.exports.getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
