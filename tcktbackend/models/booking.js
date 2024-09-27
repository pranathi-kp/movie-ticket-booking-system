const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  bookingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  showtimeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Booking;
