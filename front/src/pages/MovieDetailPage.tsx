import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/movieApi';
import { Movie, Showtime } from '../types/models';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  const {curMovie, setCurMovie} = useAuth();
  useEffect(() => {
    async function fetchMovieDetails() {
      const data = await getMovieDetails(movieId!);
      setMovie(data);
      setCurMovie(data);
    }
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const handleShowtimeClick = (showtime: Showtime) => {
    
    navigate(`/movies/${movieId}/seat-selection/${showtime.id}`, { 
      state: { showtime }
    });
  };

  return (
    <div className="movie-detail-page flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <img src={movie.posterUrl} alt={movie.name} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-3xl font-bold mt-2">{movie.name}</h2>
          <p className="text-gray-700 mt-2">{movie.description}</p>
          <p className="text-gray-600 mt-2"><strong>Genre:</strong> {movie.genre}</p>
          <p className="text-gray-600 mt-1"><strong>Duration:</strong> {movie.duration} mins</p>
          <p className="text-gray-600 mt-1"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <h3 className="text-xl font-bold mt-4">Available Showtimes</h3>
          <ul className="mt-2">
            {movie.Showtimes.map((showtime: Showtime) => (
              <li key={showtime.id} className="mt-1">
                <button 
                  onClick={() => handleShowtimeClick(showtime)} 
                  className="text-blue-500 hover:underline"
                >
                  {new Date(showtime.startTime).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
