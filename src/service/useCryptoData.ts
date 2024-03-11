import { useEffect, useState } from 'react';
import axios from 'axios';

interface TotalHoldingData {
  [cryptoName: string]: number;
}

const useCryptoData = () => {
  const [totalHoldingData, setTotalHoldingData] = useState<TotalHoldingData>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/transactions/total',
          {
            withCredentials: true,
          }
        );

        setTotalHoldingData(response.data.totalAmounts);
        console.log(response.data.totalAmounts);
      } catch (error: any) {
        // Handle errors as needed
      }
    };

    fetchData();
  }, [setTotalHoldingData]);

  return totalHoldingData;
};
