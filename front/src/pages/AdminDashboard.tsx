import React, { useEffect, useState } from 'react';
import { AddMovieForm } from '../components/AdminNavBar/AddMovieForm';
import { AddShowtimeForm } from '../components/AdminNavBar/AddShowtimeForm';
import { MovieList } from '../components/AdminNavBar/MovieList';
import { FaPlusCircle, FaClock, FaTrashAlt } from 'react-icons/fa';

interface AdminDashboardProps {
  initialTab?: 'addMovie' | 'addShowtime' | 'deleteMovie'; // Optional prop to set initial active tab
}

const AdminDashboard: React.FC<AdminDashboardProps>= ({ initialTab = 'addMovie' }) => {
  const [activeTab, setActiveTab] = useState<'addMovie' | 'addShowtime' | 'deleteMovie'>('addMovie');
  const [newlyAddedMovieId, setNewlyAddedMovieId] = useState<string>(''); // State to store the new movie ID

  useEffect(() => {
    setActiveTab(initialTab); // Update activeTab whenever initialTab changes
  }, [initialTab]);

  const switchTab = () => {
    console.log("Switching tab...");
    if (activeTab === 'addMovie') setActiveTab('addShowtime');
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'addMovie':
        return <AddMovieForm switchTab={switchTab} setNewlyAddedMovieId={setNewlyAddedMovieId} />;
      case 'addShowtime':
        return <AddShowtimeForm movieId={newlyAddedMovieId} />; // Pass the new movie ID to AddShowtimeForm
      case 'deleteMovie':
        return <MovieList />;
      default:
        return <AddMovieForm switchTab={switchTab} setNewlyAddedMovieId={setNewlyAddedMovieId} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="flex justify-around bg-gray-600 p-4 text-white mb-6">
        <button
          onClick={() => setActiveTab('addMovie')}
          className={`focus:outline-none ${activeTab === 'addMovie' ? 'text-yellow-400' : 'text-white'}`}
        >
          <FaPlusCircle className="inline-block mr-2" />
          Add Movie
        </button>
        <button
          onClick={() => setActiveTab('addShowtime')}
          className={`focus:outline-none ${activeTab === 'addShowtime' ? 'text-yellow-400' : 'text-white'}`}
        >
          <FaClock className="inline-block mr-2" />
          Add Showtime
        </button>
        <button
          onClick={() => setActiveTab('deleteMovie')}
          className={`focus:outline-none ${activeTab === 'deleteMovie' ? 'text-yellow-400' : 'text-white'}`}
        >
          <FaTrashAlt className="inline-block mr-2" />
          Delete Movie
        </button>
      </nav>

      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
