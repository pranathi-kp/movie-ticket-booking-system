# Movie Ticket Booking System - Frontend

This is the frontend of the Movie Ticket Booking System, built using React, TypeScript, and Tailwind CSS. The frontend provides a user interface for browsing movies, selecting seats, and booking tickets.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Future Enhancements](#future-enhancements)

## Technologies Used
- **React**: JavaScript library for building user interfaces
- **TypeScript**: JavaScript with static typing
- **Tailwind CSS**: Utility-first CSS framework
- **Redux**: State management library
- **React Router**: Client-side routing

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

1. Navigate to the `frontend` directory:
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
4. Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Home Page**: Provides an overview and navigation to other sections of the app.
- **Movies Page**: Lists all available movies with options to view more details.
- **Seat Selection**: Allows users to select seats for a movie and proceed to booking.
- **Booking History**: Displays the user's booking history.
- **Admin Panel**: Provides an interface for admins to manage movies and showtimes.

## Available Scripts
- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Launches the test runner.

## Future Enhancements
- **Additional Filters**: Adding filters for movie genres, release dates, etc.
- **Enhanced UI**: Implementing animations and transitions for better user experience.
- **Offline Mode**: Enable offline access with service workers.
