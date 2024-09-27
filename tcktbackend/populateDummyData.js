const { User, Movie, Showtime, Seat, Booking } = require('./models');

async function populateDummyData() {

  await Movie.bulkCreate([
    { 
      name: 'Avengers: Endgame', 
      description: 'Superheroes try to undo the snap.', 
      genre: 'Action', 
      duration: 180, 
      posterUrl: 'https://image.tmdb.org/t/p/original/mJrUdgDAfB5zhE0LyY4eXVOmOY.jpg', 
      releaseDate: '2019-04-26'
    },
    { 
      name: 'Inception', 
      description: 'A thief who enters people’s dreams.', 
      genre: 'Sci-Fi', 
      duration: 148, 
      posterUrl: 'https://image.tmdb.org/t/p/original/53rhALkaIDqkft2KRZO9ZaaRrB9.jpg', 
      releaseDate: '2010-07-16'
    }
  ]);

  await Showtime.bulkCreate([
    { startTime: '2024-09-26 14:00:00', endTime: '2024-09-26 17:00:00', movieId: 1 },
    { startTime: '2024-09-27 18:00:00', endTime: '2024-09-27 21:00:00', movieId: 1 },
    { startTime: '2024-09-26 19:00:00', endTime: '2024-09-26 21:30:00', movieId: 2 }
  ]);

  await Booking.bulkCreate([
    { bookingNumber: 'B001', totalAmount: 300, userId: 1, movieId: 1, showtimeId: 1 },
    { bookingNumber: 'B002', totalAmount: 450, userId: 2, movieId: 2, showtimeId: 3 }
  ]);  

  await Seat.bulkCreate([
    { seatNumber: 'A1', isAvailable: true, showtimeId: 1, bookingNumber: 'B001' },
    { seatNumber: 'A2', isAvailable: true, showtimeId: 1, bookingNumber: 'B001' },
    { seatNumber: 'A3', isAvailable: false, showtimeId: 1, bookingNumber: 'B002' },
    { seatNumber: 'B1', isAvailable: true, showtimeId: 1, bookingNumber: 'B001' }
  ]);

  console.log('Dummy data inserted successfully!');
}

populateDummyData();
