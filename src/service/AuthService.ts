import api from './axios';
import Cookies from 'js-cookie';

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};
export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const refreshToken = Cookies.get('refreshToken');
  try {
    await api.post(
      '/auth/logout',
      { token: refreshToken },
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  }
};
