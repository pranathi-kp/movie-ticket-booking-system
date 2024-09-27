const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Seat = require('./seat');

const Showtime = sequelize.define('Showtime', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Showtime.afterCreate(async (showtime, options) => {
  try {
    const rows = ['A', 'B', 'C', 'D'];
    const seatPromises = [];

    rows.forEach(row => {
      for (let i = 1; i <= 12; i++) {
        const seatNumber = `${row}${i}`;
        seatPromises.push(
          Seat.create({ seatNumber, showtimeId: showtime.id }) 
        );
      }
    });

    await Promise.all(seatPromises); 
  } catch (error) {
    console.error('Error creating seats:', error.message);
  }
});




module.exports = Showtime;
