import React, { useState } from 'react';
import { addShowtimeApi } from '../../api/movieApi';
import { FormField } from './FormField';
import { useAuth } from '../../hooks/useAuth';

interface AddShowtimeFormProps {
  movieId: string; // Accept movie ID as a prop
}

export const AddShowtimeForm: React.FC<AddShowtimeFormProps> = ({ movieId }) => {
  const { token } = useAuth();
  const [newShowtime, setNewShowtime] = useState({
    movieId: movieId, // Pre-populate the movie ID
    startTime: '',
    endTime: ''
  });
  const [isAdded, setIsAdded] = useState(false);

  const handleAddShowtime = async () => {
    const response = await addShowtimeApi(newShowtime, token);

    if (response.id) {
      setNewShowtime({ movieId: movieId, startTime: '', endTime: '' });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">Add Showtime</h3>

        {isAdded && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg text-center sticky top-0">
            Showtime has been successfully added!
          </div>
        )}

        <form onSubmit={e => { e.preventDefault(); handleAddShowtime(); }}>
          <FormField
            label="Movie ID"
            type="text"
            value={newShowtime.movieId}
            onChange={e => setNewShowtime({ ...newShowtime, movieId: e.target.value })}
            // disabled // Make the field read-only since the movie ID is pre-populated
          />
          <FormField
            label="Start Time"
            type="datetime-local"
            value={newShowtime.startTime}
            onChange={e => setNewShowtime({ ...newShowtime, startTime: e.target.value })}
          />
          <FormField
            label="End Time"
            type="datetime-local"
            value={newShowtime.endTime}
            onChange={e => setNewShowtime({ ...newShowtime, endTime: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow hover:bg-blue-600 transition"
          >
            Add Showtime
          </button>
        </form>
      </div>
    </div>
  );
};
