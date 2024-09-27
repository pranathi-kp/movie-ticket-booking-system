import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MovieListingsPage from '../pages/MovieListingsPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import BookingPage from '../pages/BookingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminDashboard from '../pages/AdminDashboard';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListingsPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/seat-selection/:showtimeId" element={<SeatSelectionPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
