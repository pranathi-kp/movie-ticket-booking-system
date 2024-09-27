// index.js
const sequelize = require('../config/db');
const User = require('./user');
const Movie = require('./movie');
const Seat = require('./seat');
const Showtime = require('./showtime');
const Booking = require('./booking');


User.hasMany(Booking);   
Booking.belongsTo(User);

Movie.hasMany(Booking);
Booking.belongsTo(Movie);

Movie.hasMany(Showtime);
Showtime.belongsTo(Movie);

Showtime.hasMany(Seat);
Seat.belongsTo(Showtime);

Showtime.hasMany(Booking);
Booking.belongsTo(Showtime);

Booking.hasMany(Seat, { foreignKey: 'bookingNumber', sourceKey: 'bookingNumber' });
Seat.belongsTo(Booking, { foreignKey: 'bookingNumber', targetKey: 'bookingNumber' });

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = {
  sequelize,
  User,
  Movie,
  Seat,
  Showtime,
  Booking,
};
