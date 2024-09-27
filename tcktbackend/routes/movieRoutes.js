const express = require('express');
const { addMovie, deleteMovie, addShowtime, searchMovies, getMovieByIdWithShowtimesAndSeats, getMoviesWithShowtimesAndSeats, findShowtimesByMovieId, findSeatsByShowtimeId} = require('../controllers/movieController');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search',searchMovies);
router.get('/', getMoviesWithShowtimesAndSeats);
router.get('/:id', getMovieByIdWithShowtimesAndSeats);
router.get('/showtimes/:movieId', findShowtimesByMovieId);
router.get('/:movieId/showtimes/:showtimeId/seats', findSeatsByShowtimeId);


router.post('/', authenticateJWT, isAdmin, addMovie);
router.delete('/:id', authenticateJWT, isAdmin, deleteMovie);
router.post('/showtimes', authenticateJWT, isAdmin, addShowtime);

module.exports = router;
