import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const loginEndpoint = `${API_BASE_URL}/auth/login`;
const signupEndpoint = `${API_BASE_URL}/auth/signup`;

const apiCall = async (endpoint: string, data?: any) => {
  const options = {
    method: 'POST',
    url: endpoint,
    data: data || {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};


export const loginUser = (email: string, password: string) => {
  return apiCall(loginEndpoint, { email, password });
};

export const signupUser = (username: string, email: string, password: string, isAdmin:boolean) => {
  console.log(signupEndpoint);
  return apiCall(signupEndpoint, { username, email, password, isAdmin });
};
