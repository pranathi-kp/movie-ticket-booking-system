import React, { useEffect, useState } from 'react';
import { getSeatAvailability } from '../api/movieApi';
import SeatMap from '../components/SeatMap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const SeatSelectionPage: React.FC = () => {
  const { movieId, showtimeId } = useParams<{ movieId: any; showtimeId: any }>();
  const [seats, setSeats] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { showtime } = location.state;

  useEffect(() => {
    async function fetchSeats() {
      const seatData = await getSeatAvailability(movieId, showtimeId);
      setSeats(seatData.showtime.seats);
    }
    fetchSeats();
  }, [movieId, showtimeId]);

  const handleSeatSelect = (seatNumber: string) => {
    // console.log(seatNumber);
    setSelectedSeats(prevSelectedSeats => 
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter(num => num !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleProceedToBooking = () => {
    const totalAmount = selectedSeats.length*150;
    navigate(`/booking/${movieId}/${showtimeId}`, { 
      state: { selectedSeats, showtime, totalAmount } 
    });
  };

  return (
    <div className="seat-selection-page p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Select Your Seats</h2>
      <SeatMap seats={seats} onSelectSeat={handleSeatSelect} />

      <button 
        className={`mt-6 py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out ${
          selectedSeats.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`} 
        onClick={handleProceedToBooking} 
        disabled={selectedSeats.length === 0}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default SeatSelectionPage;
