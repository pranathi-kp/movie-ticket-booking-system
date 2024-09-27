'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
      { 
        name: 'Avengers: Endgame', 
        description: 'Superheroes try to undo the snap.', 
        genre: 'Action', 
        duration: 180, 
        posterUrl: 'https://image.tmdb.org/t/p/original/mJrUdgDAfB5zhE0LyY4eXVOmOY.jpg', 
        releaseDate: new Date('2008-07-18'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Inception', 
        description: 'A thief who enters people’s dreams.', 
        genre: 'Sci-Fi', 
        duration: 148, 
        posterUrl: 'https://image.tmdb.org/t/p/original/53rhALkaIDqkft2KRZO9ZaaRrB9.jpg', 
        releaseDate: new Date('2010-07-16'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
