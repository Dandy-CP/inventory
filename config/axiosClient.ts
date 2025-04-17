import axios from 'axios';
import Cookies from 'js-cookie';

export const client = axios.create({
  baseURL: '/api/v1/',
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token');

    // Set Header Authorization in Every Request with Bearer methode
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(undefined, (error) => {
  const token = Cookies.get('token');
  const unauthorizedCode =
    error.response.status === 401 || error.response.status === 403;

  // If token exist and unauthorized code is true then
  // Remove token from cookies and reload browser
  // Purpouse to trigger middlware to check token and redirect to auth page
  if (token && unauthorizedCode) {
    Cookies.remove('token');
    window.location.reload();
  }

  return Promise.reject(error);
});
