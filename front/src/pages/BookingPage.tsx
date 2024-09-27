import React from 'react';
import BookingSummary from '../components/BookingSummary';
import SeatBookingForm from '../components/FormComponents/SeatBookingForm';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const { curMovie } = useAuth();
  const { selectedSeats, totalAmount, showtime } = location.state;

  return (
    <div className="booking-page p-4 bg-gray-100 min-h-screen flex flex-col items-center">

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Confirm Your Booking
      </h2>

      <div className="w-full max-w-lg space-y-6">
        
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
          <BookingSummary movie={curMovie} seats={selectedSeats} totalAmount={totalAmount} showtime={showtime} />
        </div>

        
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
          <SeatBookingForm seats={selectedSeats} totalAmount={totalAmount} showtimeId={showtime.id} movie={curMovie}/>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
