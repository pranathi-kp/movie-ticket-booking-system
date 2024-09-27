// models/seat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seat = sequelize.define('Seat', {
  seatNumber: {
    type: DataTypes.STRING,  
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  showtimeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookingNumber: {
    type: DataTypes.STRING, 
    references: {
      model: 'Bookings',
      key: 'bookingNumber'
    },
    allowNull: true
  }
});

module.exports = Seat;
