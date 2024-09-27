const { Booking, Movie, Seat, Showtime } = require('../models');
const { Sequelize } = require('sequelize');

const bookSeats = async (req, res) => {
  console.log(req.body)
  const { seats, showtimeId, movieId, totalAmount } = req.body;
  try {
      const availableSeats = await Seat.findAll({
          where: {
              seatNumber: seats, 
              isAvailable: true,
              showtimeId
          }
      });

      if (availableSeats.length !== seats.length) {
          return res.status(400).json({ error: 'Some seats are unavailable' });
      }

      const booking = await Booking.create({
          userId: req.user.id,
          movieId,
          showtimeId,
          totalAmount
      });

      const bookedSeats = [];
      
      await Promise.all(availableSeats.map(async (seat) => {
          seat.isAvailable = false; 
          seat.bookingNumber = booking.bookingNumber; 
          await seat.save();

          
          bookedSeats.push({
              seatNumber: seat.seatNumber,
              bookingNumber: booking.bookingNumber
          });
      }));

      res.json({ 
          booking: {
              bookingNumber: booking.bookingNumber,
              id: booking.id,
              userId: booking.userId,
              movieId: booking.movieId,
              showtimeId: booking.showtimeId,
              totalAmount: booking.totalAmount,
              createdAt: booking.createdAt,
              updatedAt: booking.updatedAt
          },
          bookedSeats 
      });
  } catch (error) {
      res.status(400).json({ error: 'Booking failed', details: error.message });
  }
};

const getBookingHistory = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Movie, attributes: ['name', 'posterUrl'] },
        { 
          model: Showtime, 
          attributes: ['startTime', 'endTime']
        },
        { 
          model: Seat, 
          attributes: ['seatNumber'],
          where: { bookingNumber: { [Sequelize.Op.ne]: null } }
        }
      ]
    });

    const history = bookings.map(booking => ({
      movieName: booking.Movie?.name || 'N/A',
      posterUrl: booking.Movie?.posterUrl || 'N/A',
      showtime: {
        startTime: booking.Showtime?.startTime || 'N/A',
        endTime: booking.Showtime?.endTime || 'N/A',
      },
      seats: booking.Seats.map(seat => seat.seatNumber) || [],
      totalAmount: booking.totalAmount
    }));

    res.json(history);
  } catch (error) {
    console.error('Error fetching booking history:', error.message);
    res.status(500).json({ error: 'Error fetching booking history', details: error.message });
  }
};


  

module.exports = { bookSeats, getBookingHistory };
