import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,

  (error) => {
    let message = 'Something went wrong';

    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.statusText;
    } else if (error.request) {
      message =
        'Server not responding. Please try again.';
    } else {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;