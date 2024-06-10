import axios from 'axios';
import Cookies from 'js-cookie';
import { logoutUser } from './AuthService';

const api = axios.create({
  baseURL: 'https://cryptrack-server.onrender.com',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          // If there's no refresh token, log out the user
          await logoutUser();
          return Promise.reject(error);
        }
        const { data } = await api.post('/auth/refresh-token');
        Cookies.set('accessToken', data.accessToken, {
          sameSite: 'none',
          secure: true,
        });
        Cookies.set('refreshToken', data.refreshToken, {
          sameSite: 'none',
          secure: true,
        });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      } catch (err) {
        console.error('Token refresh failed', err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
