# Movie Ticket Booking System

This is a full-stack Movie Ticket Booking System that allows users to browse movies, select seats, and book tickets. The system includes an admin panel for managing movies and showtimes. The project is divided into two main parts: the **Backend** (API server) and the **Frontend** (User Interface).
### Note:
- find detailed readme files in respective folders

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features
- **User Functionality**:
  - Browse movies and view details.
  - Select seats and book tickets.
  - View booking history.
- **Admin Functionality**:
  - Manage movies (add, update, delete).
  - Set and manage showtimes.
  - View all bookings.

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Redux
- **Backend**: Node.js, Express, Sequelize ORM, MySQL, JWT Authentication
- **Database**: MySQL

## Project Structure
```
movie-ticket-booking-system/
├── backend/ # Backend code (API server)
├── frontend/ # Frontend code (React app)
├── README.md # Main project README
```

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure your SQL database in the .env file.
  
4.Run the migrations:
  ```bash
  npx sequelize db:migrate
  ```
5. Seed the database.
   ```bash
   npx sequelize-cli db:seed:undo --seed 20240927160144-seed-movies
   ```
   ```bash
   npx sequelize-cli db:seed --seed 20240927161214-seed-showtimes
   ```
   ```bash
   npx sequelize-cli db:seed 20240927165034-seed-seats
   ```
   
6. Start the development server.
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to http://localhost:3000.

### Now sign up (role-based authentication) to use all functionalities of the application

## Usage
- **Frontend**: The frontend provides a user interface for browsing movies, selecting seats, booking tickets, and viewing booking history.
- **Backend**: The backend serves as the API server that handles requests from the frontend and communicates with the database.

## Future Enhancements
- **Additional Filters**: Add more filters to movie listings..
- **Analytics**: Implement advanced analytics and reporting for admins.
