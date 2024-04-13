import axios from 'axios';

 //export const BASE_URL = 'http://localhost:4000';
export const BASE_URL = 'https://be-finallv4.onrender.com';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log("token",token);
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);