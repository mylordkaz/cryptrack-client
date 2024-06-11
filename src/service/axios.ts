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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          await logoutUser();
          return Promise.reject(error);
        }
        const { data } = await api.post('/auth/refresh-token', {
          token: refreshToken,
        });
        Cookies.set('accessToken', data.accessToken, {
          sameSite: 'lax',
          secure: true,
        });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        await logoutUser();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
