const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieJoiValidation, deleteMovieJoiValidation } = require('../middlewares/joiValidation');

router.get('/', getMovies);
router.post('/', createMovieJoiValidation, createMovie);
router.delete('/:_id', deleteMovieJoiValidation, deleteMovie);

module.exports = router;
