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
  await api.post('auth/logout');
  Cookies.remove('accessToken', { path: '/' });
  Cookies.remove('refreshToken', { path: '/' });
};
