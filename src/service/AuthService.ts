import axios from 'axios';
import { useTransactionContext } from '../context/TransactionContext';

const { resetState } = useTransactionContext();

const logout = async (): Promise<boolean> => {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log('Logout successful');
      resetState();
      localStorage.clear();

      return true;
    } else {
      console.error('Failed to logout');
      return false;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error during logout:', error.message);
    } else if (error instanceof Error) {
      console.error('General error during logout:', error.message);
    }
    return false;
  }
};

export { logout };
