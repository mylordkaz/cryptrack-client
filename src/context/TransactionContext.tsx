import { ReactNode, createContext, useContext, useState } from 'react';
import useCryptoData from '../service/useCryptoData';
import useCryptoPrices from '../service/api/useCryptoPrices';

interface TransactionsContextType {
  totalHoldingData: { [cryptoName: string]: number };
  cryptoPrices: { name: string; price: number }[];
  refreshData: () => void;
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
  const refreshData = async () => {
    try {
      const updatedTotalHoldingData = useCryptoData();
      const updatedCryptoPrices = useCryptoPrices();
      setTotalHoldingData(updatedTotalHoldingData);
      setCryptoPrices(updatedCryptoPrices);
    } catch (error) {
      console.error('Failed to fetch updated data:', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ totalHoldingData, cryptoPrices, refreshData }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
