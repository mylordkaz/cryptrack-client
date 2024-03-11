import { useState, useEffect } from 'react';
import {
  fetchCryptoPrices,
  CryptoData,
} from '../service/api/fetchCryptoPrices';

const useCryptoPrices = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const prices = await fetchCryptoPrices();
      setCryptoPrices(prices);
    };

    fetchData();
  }, []);

  return cryptoPrices;
};

export default useCryptoPrices;
