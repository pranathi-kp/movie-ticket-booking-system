// SearchFilter Component
import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (searchQuery: string, genre?: string, releaseDate?: string) => void;
  onFilter: (genre: string, releaseDate: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery, genre, releaseDate);
  };

  const handleFilter = () => {
    onFilter(genre, releaseDate);
  };

  return (
    <div className="search-filter p-4 bg-gray-50 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Sci-fi">Sci-fi</option>
      </select>
      <input
        type="date"
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
