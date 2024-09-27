'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Showtimes', [
      {
        startTime: '2024-09-26 14:00:00',
        endTime: '2024-09-26 17:00:00',
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startTime: '2024-09-27 18:00:00',
        endTime: '2024-09-27 21:00:00',
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startTime: '2024-09-26 19:00:00',
        endTime: '2024-09-26 21:30:00',
        movieId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Showtimes', null, {});
  }
};
