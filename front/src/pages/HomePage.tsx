import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movieApi'; // Assuming this fetches movie data
import { getBookingHistory } from '../api/bookingApi'; // Import the booking history function
import { Movie } from '../types/models';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]); // Adjust the type as necessary

  useEffect(() => {
    async function fetchData() {
      const moviesData = await getMovies(1, 4);
      setMovies(moviesData.movies);

      const bookingHistoryData = await getBookingHistory(token);
      
      setBookingHistory(bookingHistoryData);
    }
    fetchData();
  }, [token]);

  return (
    <div className="home-page p-4">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies?.map((movie) => (
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Booking History</h2>
      {bookingHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookingHistory.map((booking, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
              <img src={booking.posterUrl} alt={booking.movieName} className="w-full h-48 object-cover mb-2" />
              <h3 className="font-semibold text-lg">{booking.movieName}</h3>
              <p className="text-gray-600">
                Showtime: {new Date(booking.showtime.startTime).toLocaleString()} {/* Format the start time */}
              </p>
              <p className="text-gray-600">Seats: {booking.seats.join(', ')}</p>
              <p className="text-gray-600">Total Amount: ${booking.totalAmount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No booking history found.</p>
      )}
    </div>
  );
};

export default HomePage;
