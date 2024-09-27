import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovieApi } from '../../api/movieApi';
import { Movie } from '../../types/models';
import { useAuth } from '../../hooks/useAuth';

export const MovieList: React.FC = () => {
  const {token} = useAuth(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedMovieName, setSelectedMovieName] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const fetchedMovies = await getMovies();
    setMovies(fetchedMovies.movies);
  };

  const handleDeleteMovie = async (id: number, name: string) => {
    const response = await deleteMovieApi(id,token);
    console.log("under del");
    console.log(response, "res");
    if (response.message) {
      setMovies(movies.filter(movie => movie.id !== id));
      setSelectedMovieName(name);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">Movies List</h3>

        {deleteSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg sticky top-0">
            Movie <strong>{selectedMovieName}</strong> has been successfully deleted!
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition">
              <h4 className="text-lg font-semibold mb-2">{movie.name}</h4>
              <p className="text-sm text-gray-600 mb-2">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mb-4">{movie.genre}</p>
              <p className="text-sm text-gray-600 mb-4"><span>Movie Id </span>{movie.id}</p>
              <button
                onClick={() => handleDeleteMovie(movie.id, movie.name)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
