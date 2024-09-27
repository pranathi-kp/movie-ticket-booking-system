import React, { Dispatch, SetStateAction, useState } from 'react';
import { addMovieApi } from '../../api/movieApi';
import { FormField } from './FormField';
import { useAuth } from '../../hooks/useAuth';
import AdminDashboard from '../../pages/AdminDashboard';

interface AdminFormProps {
  switchTab: () => void;
  setNewlyAddedMovieId: Dispatch<SetStateAction<string>>; // New prop to pass movie ID
}

export const AddMovieForm: React.FC<AdminFormProps> = ({ switchTab, setNewlyAddedMovieId }) => {
  const { token } = useAuth();
  const [newMovie, setNewMovie] = useState({
    name: '',
    description: '',
    genre: '',
    duration: '',
    posterUrl: '',
    releaseDate: ''
  });
  const [isAdded, setIsAdded] = useState(false);

  const handleAddMovie = async () => {
    const response = await addMovieApi(newMovie, token);
    console.log(response, 'res');
    if (response.id) {
      // Movie successfully added
      setNewMovie({
        name: '',
        description: '',
        genre: '',
        duration: '',
        posterUrl: '',
        releaseDate: ''
      });
      console.log("Movie added successfully");
      setIsAdded(true);
      // alert("successfully added");
      setNewlyAddedMovieId(response.id);
      console.log("Movie added successfully");
      
       // Assuming the response contains the movie ID
      setTimeout(() => {setIsAdded(false); switchTab();}, 3000); // Hide the alert after 3 seconds
      // switchTab()
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">Add New Movie</h3>

        {isAdded && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg text-center sticky top-0">
            Movie has been successfully added!
          </div>
        )}

        <form onSubmit={e => { e.preventDefault(); handleAddMovie(); }}>
          <FormField
            label="Movie Name"
            type="text"
            value={newMovie.name}
            onChange={e => setNewMovie({ ...newMovie, name: e.target.value })}
          />
          <FormField
            label="Description"
            type="text"
            value={newMovie.description}
            onChange={e => setNewMovie({ ...newMovie, description: e.target.value })}
            isTextArea
          />
          <FormField
            label="Genre"
            type="text"
            value={newMovie.genre}
            onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <FormField
            label="Duration (mins)"
            type="number"
            value={newMovie.duration}
            onChange={e => setNewMovie({ ...newMovie, duration: e.target.value })}
          />
          <FormField
            label="Poster URL"
            type="text"
            value={newMovie.posterUrl}
            onChange={e => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
          />
          <FormField
            label="Release Date"
            type="date"
            value={newMovie.releaseDate}
            onChange={e => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-md shadow hover:bg-green-600 transition"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};
