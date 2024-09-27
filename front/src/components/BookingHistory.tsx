import React, { useEffect, useState } from 'react';
import { getBookingHistory } from '../api/bookingApi';
import { Booking } from '../types/models';
import { useAuth } from '../hooks/useAuth';

const BookingHistory: React.FC = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookingHistory() {
      const data = await getBookingHistory(token);
      setBookings(data);
    }
    fetchBookingHistory();
  }, []);

  return (
    <div className="booking-history">
      <h2 className="text-xl font-bold mb-4">Your Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="mb-2">
            <strong>{booking.movie.name}</strong> - {new Date(booking.showtime.startTime).toLocaleString()}
            <br />
            Seats: {booking.seats.map((seat) => seat.seatNumber).join(', ')} - Total: ${booking.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
