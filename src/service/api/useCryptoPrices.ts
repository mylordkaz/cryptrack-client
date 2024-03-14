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
      const cacheKey = 'cryptoPrices';
      const cacheData = localStorage.getItem(cacheKey);

      if (cacheData) {
        const { data, timestamp } = JSON.parse(cacheData);
        const now = new Date();

        if (now.getTime() - timestamp < 5 * 60 * 1000) {
          setCryptoPrices(data);
          return;
        }
      }
      try {
        const response = await axios.get(
          'https://cryptrack-server.onrender.com/cryptos/prices',
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: response.data.cryptoPrices,
            timestamp: new Date().getTime(),
          })
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
