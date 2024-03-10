import { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  name: string;
  price: number;
}

const useCryptoPrices = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/cryptos/prices',
          {
            withCredentials: true,
          }
        );

        setCryptoPrices(response.data.cryptoPrices as CryptoData[]);
      } catch (error: any) {
        console.error('Error fetching crypto prices:', error.message);
      }
    };

    fetchCryptoPrices();
  }, []);

  return cryptoPrices;
};

export default useCryptoPrices;
