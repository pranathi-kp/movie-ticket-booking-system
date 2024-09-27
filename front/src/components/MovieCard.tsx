import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/models';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  return (
    <div className="movie-card p-4 border rounded shadow-md">
      <img src={movie.posterUrl} alt={movie.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-2 font-bold text-lg">{movie.name}</h3>
      <p>{movie.genre}</p>
      <p>{movie.duration} mins</p>
      <Link to={`/movies/${movie.id}`} className="mt-2 text-blue-500">
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
