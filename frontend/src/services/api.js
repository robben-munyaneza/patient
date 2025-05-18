// frontend/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if needed
});

// Set JWT token for all requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
