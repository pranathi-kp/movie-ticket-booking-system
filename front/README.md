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
frontend/
├── public/                        # Public assets like the HTML file, favicon
│   └── index.html                 # Main HTML file, where React is mounted
├── src/                           # React source code
│   ├── api/                       # Axios instances and functions to call backend APIs
│   │   └── api.ts                 # Axios setup and endpoints for movie, booking, auth APIs
│   ├── assets/                    # Images, icons, and other static assets
│   ├── components/                # Reusable UI components
│   │   ├── MovieCard.tsx          # Displays individual movie details on the homepage
│   │   ├── SeatSelector.tsx       # Component for seat selection UI
│   │   ├── BookingSummary.tsx     # Booking confirmation UI
│   │   └── AdminMovieForm.tsx     # Form for adding/editing movies (admin feature)
│   ├── context/                   # React Context for managing global state
│   │   └── AuthContext.tsx        # Authentication context (handles login state, JWT)
│   ├── hooks/                     # Custom React hooks for reusability
│   │   ├── useAuth.ts             # Custom hook to manage authentication logic (JWT)
│   │   └── useBooking.ts          # Custom hook for managing booking flow
│   ├── pages/                     # Main pages for the app
│   │   ├── HomePage.tsx           # Homepage with movie listings
│   │   ├── MovieDetailPage.tsx    # Movie detail and seat selection page
│   │   ├── BookingHistoryPage.tsx # User's past booking history
│   │   ├── LoginPage.tsx          # Login page
│   │   ├── SignupPage.tsx         # Signup page
│   │   ├── AdminDashboard.tsx     # Admin dashboard for movie management
│   │   └── NotFoundPage.tsx       # 404 error page
│   ├── styles/                    # Tailwind CSS configurations and custom styles
│   │   └── tailwind.css           # Tailwind CSS global styles
│   ├── utils/                     # Utility functions like JWT handling and form validation
│   │   ├── jwt.ts                 # Helper functions for encoding/decoding JWT tokens
│   │   └── validations.ts         # Form validation logic (for login, signup, etc.)
│   ├── App.tsx                    # Main App component (sets up routing)
│   ├── index.tsx                  # ReactDOM entry point (renders App)
│   ├── routes/                    # Route definitions for the app using React Router
│   │   └── AppRoutes.tsx          # Route structure for the app, including protected routes
│   └── types/                     # TypeScript types for strong typing
│       └── models.d.ts            # Type definitions for models (e.g., Movie, Booking, User)
├── tailwind.config.js             # Tailwind CSS configuration
├── package.json                   # NPM dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

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
