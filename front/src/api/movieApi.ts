//api 
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const moviesEndpoint = `${API_BASE_URL}/movies`;

const movieDetailsEndpoint = (id: string) => `${API_BASE_URL}/movies/${id}`;


const searchMoviesEndpoint = (name: string, genre: string, releaseDate: string, page: number = 1, limit: number = 10) => {
  let query = `${API_BASE_URL}/movies/search?page=${page}&limit=${limit}`;
  if (name) query += `&name=${name}`;
  if (genre) query += `&genre=${genre}`;
  if (releaseDate) query += `&releaseDate=${releaseDate}`;
  return query;
};

const upcomingShowsEndpoint = `${API_BASE_URL}/movies/upcoming`;

const seatAvailabilityEndpoint = (movieId: string, showtimeId: string) => `${API_BASE_URL}/movies/${movieId}/showtimes/${showtimeId}/seats`;

const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params || {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};


export const getMovies = (page: number = 1, limit: number = 10) => {
  return apiCall(moviesEndpoint, { page, limit });
};


export const getMovieDetails = (id: string) => {
  return id ? apiCall(movieDetailsEndpoint(id)) : null;
};


export const searchMovies = (name: string, genre: string, releaseDate: string) => {
  const query = searchMoviesEndpoint(name, genre, releaseDate);
  return apiCall(query);
};

export const getUpcomingShows = () => {
  return apiCall(upcomingShowsEndpoint);
};

export const getSeatAvailability = (movieId: string, showtimeId: string) => {
  return apiCall(seatAvailabilityEndpoint(movieId, showtimeId));
};


export const addMovieApi = async (movieData: any, token: string | null) => {
  const headers: { [key: string]: string } = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  try {
    const response = await axios.post(`${API_BASE_URL}/movies`, movieData, {headers});
    return response.data;
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};

export const deleteMovieApi = async (movieId: any, token: string | null) => {
  const headers: { [key: string]: string } = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  try {
    const response = await axios.delete(`${API_BASE_URL}/movies/${movieId}`,{headers});
    return response.data;
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};

export const addShowtimeApi = async (showtimeData: any, token: string | null) => {
  const headers: { [key: string]: string } = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  try {
    const response = await axios.post(`${API_BASE_URL}/movies/showtimes`, showtimeData, {headers});
    return response.data;
  } catch (error) {
    console.error('Error adding showtime:', error);
  }
};
