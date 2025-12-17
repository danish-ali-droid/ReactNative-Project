import axios from 'axios';
import mockAPI from './mockAPI';
// Create axios instance
const API = axios.create({
  baseURL: 'https://your-api-url.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Use AsyncStorage in React Native
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Use mockAPI for now, replace with real API later
export const authAPI = {
  login: (credentials) => mockAPI.login(credentials),
  signup: (userData) => mockAPI.signup(userData),
  // ... other methods
};

// User API calls
export const userAPI = {
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
};

export default API;