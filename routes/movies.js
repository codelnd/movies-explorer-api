const moviesRouter = require('express').Router();
const {getMovies} = require('../controllers/movies')

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', createMovies);
moviesRouter.delete('/movies/:_id', deleteMovies);

module.exports = moviesRouter;
