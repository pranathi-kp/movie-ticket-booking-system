import { useState } from 'react';

export const useBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const addSeat = (seatId: number) => {
    setSelectedSeats([...selectedSeats, seatId]);
  };

  const removeSeat = (seatId: number) => {
    setSelectedSeats(selectedSeats.filter(id => id !== seatId));
  };

  return {
    selectedSeats,
    addSeat,
    removeSeat,
  };
};
