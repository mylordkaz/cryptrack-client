import { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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
    if (accessToken) {
      // decode token to get user info
      const user = {};
      setUser(user);
    }
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const data = await registerUser(username, email, password);
    Cookies.set('accessToken', data.accessToken, {
      sameSite: 'none',
      secure: true,
    });
    Cookies.set('refreshToken', data.refreshToken, {
      sameSite: 'none',
      secure: true,
    });
    setUser({ username: data.username, email: data.email });
  };
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    Cookies.set('accessToken', data.accessToken, {
      sameSite: 'none',
      secure: true,
    });
    Cookies.set('refreshToken', data.refreshToken, {
      sameSite: 'none',
      secure: true,
    });
    setUser({ email: data.email });
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('accessToken', { sameSite: 'none', secure: true });
      Cookies.remove('refreshToken', { sameSite: 'none', secure: true });
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
