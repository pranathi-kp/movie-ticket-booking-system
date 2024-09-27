//movielist
import React, { useEffect, useState } from 'react';
import { getMovies, searchMovies } from '../api/movieApi';
import { Movie } from '../types/models';
import SearchFilter from '../components/SearchFilter';
import { Link } from 'react-router-dom';

const MovieListingsPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies(page, 4);
      setMovies(data.movies);
    }
    fetchMovies();
  }, [page]);

  
  const handleSearch = async (searchQuery: string, genre: string = '', releaseDate: string = '') => {
    const data = await searchMovies(searchQuery, genre, releaseDate);
    setMovies(data?.movies);
  };

  const handleFilter = async (genre: string, releaseDate: string) => {
    console.log(releaseDate);
    await handleSearch('', genre, releaseDate);
  };

  if(movies?.length===0) return (
    <div className="movie-listings-page p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-red-700">No movies Found Try Again</h2>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
    </div>
  )

  return (
    <div className="movie-listings-page p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Movies</h2>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <img src={movie.posterUrl} alt={movie.name} className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.name}</h3>
              <p className="text-gray-600">{movie.genre}</p>
              <p className="text-gray-800 mt-2">{movie.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination controls can be added here */}
    </div>
  );
};

export default MovieListingsPage;
