import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const bookingEndpoint = `${API_BASE_URL}/bookings`;
const bookingHistoryEndpoint = `${API_BASE_URL}/bookings/history`;


const apiCall = async (endpoint: string, params?: any, headers?: { Authorization?: string }) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params || {},
    headers: headers || {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};



export const bookSeats = async (bookingData:any, token:any) => {
  try {
    const headers: { [key: string]: string } = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(bookingEndpoint, bookingData, {headers});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};

export const getBookingHistory = (token: string | null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return apiCall(bookingHistoryEndpoint, {}, headers); 
};
