import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieListingsPage from './pages/MovieListingsPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/Navbar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Add NavBar for navigation */}
        <NavBar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MovieListingsPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
          <Route path="/movies/:movieId/seat-selection/:showtimeId" element={<SeatSelectionPage />} />
          <Route path="/booking/:moveId/:showtimeId" element={<BookingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin route */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all route for non-existent paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
