'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Seats', [
      {
        seatNumber: 'A1',
        isAvailable: true,
        showtimeId: 1,
        bookingNumber: 'B001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatNumber: 'A2',
        isAvailable: true,
        showtimeId: 1,
        bookingNumber: 'B001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatNumber: 'A3',
        isAvailable: false,
        showtimeId: 2,
        bookingNumber: 'B002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatNumber: 'B1',
        isAvailable: true,
        showtimeId: 2,
        bookingNumber: 'B001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
