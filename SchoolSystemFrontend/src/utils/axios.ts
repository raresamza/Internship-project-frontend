
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7213/api', // Adjust to your API base
});

// Add the token to all requests
api.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('token')?? 'null'); // or sessionStorage, or from a custom auth store
  console.log(token + " token from api interceptor") 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;