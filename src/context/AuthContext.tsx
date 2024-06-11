import { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { loginUser, logoutUser, registerUser } from '../service/AuthService';

interface AuthContextType {
  user: any;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken)
      try {
        const decodedToken = jwtDecode(accessToken);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const data = await registerUser(username, email, password);
    Cookies.set('accessToken', data.accessToken, {
      sameSite: 'lax',
      secure: true,
    });
    Cookies.set('refreshToken', data.refreshToken, {
      sameSite: 'lax',
      secure: true,
    });
    const decodedToken = jwtDecode(data.accessToken);
    setUser({ username: data.username, email: data.email, ...decodedToken });
  };
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    Cookies.set('accessToken', data.accessToken, {
      sameSite: 'lax',
      secure: true,
    });
    Cookies.set('refreshToken', data.refreshToken, {
      sameSite: 'lax',
      secure: true,
    });
    const decodedToken = jwtDecode(data.accessToken);
    setUser({ email: data.email, ...decodedToken });
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('accessToken', { sameSite: 'lax', secure: true });
      Cookies.remove('refreshToken', { sameSite: 'lax', secure: true });
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
