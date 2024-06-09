import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchCryptoPrices } from '../service/api/fetchCryptoPrices';
import { fetchTotalHoldingData } from '../service/fetchTotalHolding';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

interface TransactionsContextType {
  totalHoldingData: { [cryptoName: string]: number };
  cryptoPrices: { name: string; price: number }[];
  refreshData: () => void;
  resetState: () => void;
}

const TransactionContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a provider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalHoldingData, setTotalHoldingData] = useState<{
    [cryptoName: string]: number;
  }>({});
  const [cryptoPrices, setCryptoPrices] = useState<
    { name: string; price: number }[]
  >([]);

  const { user } = useContext(AuthContext)!;
  const refreshData = async () => {
    if (!user) return;
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const updatedTotalHoldingData = await fetchTotalHoldingData(accessToken);
      const updatedCryptoPrices = await fetchCryptoPrices();
      setTotalHoldingData(updatedTotalHoldingData);
      setCryptoPrices(updatedCryptoPrices);
    } catch (error) {
      console.error('Failed to fetch updated data:', error);
    }
  };

  const resetState = () => {
    setTotalHoldingData({});
    setCryptoPrices([]);
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  return (
    <TransactionContext.Provider
      value={{ totalHoldingData, cryptoPrices, refreshData, resetState }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
