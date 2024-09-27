const { Movie, Showtime, Seat } = require('../models');
const { Op } = require('sequelize');


const getMoviesWithShowtimesAndSeats = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const movies = await Movie.findAndCountAll({
      include: [
        {
          model: Showtime,
          include: [
            {
              model: Seat,
              attributes: ['seatNumber', 'isAvailable']
            }
          ]
        }
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });
    
    res.json({
      totalMovies: movies.count,
      totalPages: Math.ceil(movies.count / limit),
      movies: movies.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieByIdWithShowtimesAndSeats = async (req, res) => {
  const { id } = req.params; 
  try {
    const movie = await Movie.findOne({
      where: { id },
      include: [
        {
          model: Showtime,
          include: [
            {
              model: Seat,
              attributes: ['seatNumber', 'isAvailable']
            }
          ]
        }
      ]
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const findShowtimesByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params ;
    
    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required' });
    }
 
    const showtimes = await Showtime.findAll({
      where: { MovieId: movieId }, 
      attributes: ['id', 'startTime', 'endTime'],
      include: [
        {
          model: Movie,
          attributes: ['id', 'name'], 
        }
      ]
    });
 
    if (!showtimes.length) {
      return res.status(404).json({ message: 'No showtimes found for this movie' });
    }
 
    res.json({
      movieId,
      showtimes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 
const findSeatsByShowtimeId = async (req, res) => {
  try {
    const { movieId, showtimeId } = req.params;
    
    if (!movieId || !showtimeId) {
      return res.status(400).json({ message: 'Movie ID and Showtime ID are required' });
    }

    const showtime = await Showtime.findOne({
      where: {
        id: showtimeId,
        movieId: movieId
      },
      include: [
        {
          model: Seat,
          attributes: ['id', 'seatNumber', 'isAvailable']
        }
      ]
    });

    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found for the given movie' });
    }

    res.json({
      showtime: {
        id: showtime.id,
        seats: showtime.Seats,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 

const addMovie = async (req, res) => {
  const { name, description, genre, duration, posterUrl, releaseDate } = req.body;
  try {
    const movie = await Movie.create({ name, description, genre, duration, posterUrl, releaseDate });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error adding movie' });
  }
};


const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.destroy({ where: { id } });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting movie' });
  }
};


const addShowtime = async (req, res) => {
  const { movieId, startTime, endTime } = req.body;
  try {
    const showtime = await Showtime.create({ movieId, startTime, endTime });
    res.json(showtime);
  } catch (error) {
    res.status(500).json({ error: 'Error adding showtime' });
  }
};


const searchMovies = async (req, res) => {
  console.log(req.query);
  const { name, genre, releaseDate, page = 1, limit = 10 } = req.query;
  
  const query = {
    where: {},
    limit: parseInt(limit),
    offset: (page - 1) * limit
  };

  if (name) query.where.name = { [Op.like]: `%${name.toLowerCase()}%` };
  if (genre) query.where.genre = { [Op.like]: `%${genre.toLowerCase()}%` };
  if (releaseDate) query.where.releaseDate = releaseDate;

  try {
    const movies = await Movie.findAndCountAll(query);
    res.json({
      totalMovies: movies.count,
      totalPages: Math.ceil(movies.count / limit),
      movies: movies.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
};


module.exports = { addMovie, deleteMovie, addShowtime, searchMovies, getMoviesWithShowtimesAndSeats, findShowtimesByMovieId, findSeatsByShowtimeId, getMovieByIdWithShowtimesAndSeats };
