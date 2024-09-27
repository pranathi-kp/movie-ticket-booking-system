import React, { useState } from 'react';

interface SeatMapProps {
  seats: any[]; 
  onSelectSeat: (seatNumber: string) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, onSelectSeat }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(num => num !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSelectSeat(seatNumber);
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-4">
      {seats.map((seat) => (
        <div
          key={seat.seatNumber}
          className={`seat-box p-4 rounded-md text-center cursor-pointer transition duration-300 ease-in-out
            ${seat.isAvailable ? 
              selectedSeats.includes(seat.seatNumber) ? 'bg-blue-500 text-white' : 'bg-green-500 text-white hover:bg-green-400'
              : 'bg-red-500 text-white cursor-not-allowed'
            }`}
          onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
        >
          {seat.seatNumber}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
