# Movie Ticket Booking System - Backend

This is the backend server for the Movie Ticket Booking System. It provides RESTful API endpoints for managing movies, bookings, and user authentication. The backend is built using Node.js, Express, Sequelize ORM, and MySQL.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Technologies Used
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Sequelize**: ORM for SQL databases
- **MySQL**: Relational database
- **JWT**: JSON Web Token for authentication

## Project Structure


```
├── backend/                       # Backend folder (Node.js, Sequelize, JWT, MySQL)
│   ├── config/                    # Configuration files (database, environment variables)
│   │   └── db.js                  # Database connection configuration
│   ├── controllers/               # Controller logic (business logic for each API endpoint)
│   │   ├── authController.js      # Signup, login, JWT token management
│   │   ├── bookingController.js   # Manage bookings, seat selection, payments
│   │   └── movieController.js     # CRUD operations for movies, admin routes
│   ├── models/                    # Sequelize models (database schemas)
│   │   ├── User.js                # User model (admin, customers)
│   │   ├── Movie.js               # Movie model
│   │   ├── Booking.js             # Booking model
│   │   └── Seat.js                # Seat model
│   ├── routes/                    # Routes for each API (maps HTTP methods to controller functions)
│   │   ├── authRoutes.js          # Routes for user authentication (signup, login)
│   │   ├── movieRoutes.js         # Routes for movie operations
│   │   └── bookingRoutes.js       # Routes for seat booking operations
│   ├── middleware/                # Middleware (authentication, error handling)
│   │   └── authMiddleware.js      # JWT authentication and authorization
│   ├── utils/                     # Helper utilities (e.g., JWT generation, password hashing)
│   │   ├── jwt.js                 # JWT token generation/verification
│   │   └── bcrypt.js              # Password hashing utilities
│   ├── services/                  # Business logic, reusable services
│   │   ├── bookingService.js      # Handle seat reservations, seat availability checks
│   │   └── userService.js         # User authentication/authorization services
│   ├── app.js                     # Main Express application entry point
│   ├── server.js                  # Server entry point (starts the backend server)
│   └── .env                       # Environment variables```

## Installation

1. Clone the repository and navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Configure your SQL database in the `.env` file:
    ```env
    DB_NAME=movie_booking
    DB_USER=root
    DB_PASS=password
    DB_HOST=localhost
    PORT=5000
    JWT_SECRET=supersecretkey
    ```
4. Run the migrations to set up the database schema:
    ```bash
    npx sequelize db:migrate
    ```
5. Seed the database with initial data:
    ```bash
    npx sequelize-cli db:seed:undo --seed 20240927160144-seed-movies
    ```
    ```bash
    npx sequelize-cli db:seed --seed 20240927161214-seed-showtimes
    ```
    ```bash
    npx sequelize-cli db:seed 20240927165034-seed-seats
    ```bash
6. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
- The backend serves as the API server for the Movie Ticket Booking System.
- It handles requests from the frontend and interacts with the MySQL database.

## API Endpoints
- **`/api/auth`**
  - POST `/login`: Login for users and admins.
  - POST `/signup`: Signup for users and admins.
- **`/api/movies`**
  - GET `/`: Retrieve all movies.
  - GET `/search`: search and filter movies.
  - GET `/:id`: Retrive movie details by id.
  - GET `/showtimes/:movieId`: Get all showtimes of movie by movie Id.
  - GET `/:movieId/showtimes/:showtimeId/seats`: Find seats for a particular showtime.
  - POST `/`: Create a new movie (Admin only).
  - PUT `/:id`: Update an existing movie (Admin only).
  - DELETE `/:id`: Delete a movie (Admin only).
- **`/api/bookings`**
  - POST `/`: Create a new booking.
  - GET `/history`: Retrieve booking history for a user.
