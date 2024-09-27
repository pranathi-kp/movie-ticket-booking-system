import React from 'react';
import { Movie, Seat, Showtime } from '../types/models';
import { FaCalendarAlt, FaClock, FaChair, FaFilm, FaMoneyBillWave } from 'react-icons/fa';

interface BookingSummaryProps {
  movie: Movie | null;
  seats: string[];
  totalAmount: number;
  showtime: Showtime;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ movie, seats, totalAmount, showtime }) => {
  const showtimeDate = new Date(showtime.startTime);
  const formattedDate = showtimeDate.toLocaleDateString(); // Date in MM/DD/YYYY or localized format
  const formattedTime = showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

  return (
    <div className="booking-summary bg-white p-6 rounded-lg max-w-lg w-full mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Booking Summary</h3>
      
      <div className="mb-4 flex items-center space-x-3">
        <FaFilm className="text-blue-500 text-xl" />
        <p className="text-lg"><strong>Movie:</strong> {movie?.name}</p>
      </div>
      
      <div className="mb-4 flex items-center space-x-3">
        <FaCalendarAlt className="text-green-500 text-xl" />
        <p className="text-lg"><strong>Date:</strong> {formattedDate}</p>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <FaClock className="text-yellow-500 text-xl" />
        <p className="text-lg"><strong>Time:</strong> {formattedTime}</p>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <FaChair className="text-red-500 text-xl" />
        <p className="text-lg"><strong>Seats:</strong> {seats.join(', ')}</p>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <FaMoneyBillWave className="text-green-500 text-xl" />
        <p className="text-lg"><strong>Total Amount:</strong> ${totalAmount}</p>
      </div>

    </div>
  );
};

export default BookingSummary;
