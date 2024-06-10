import { useEffect, useState } from 'react';
import {
  fetchTotalHoldingData,
  TotalHoldingData,
} from '../service/fetchTotalHolding';
import Cookies from 'js-cookie';
// Adjust the path as necessary

const useCryptoData = () => {
  const [totalHoldingData, setTotalHoldingData] = useState<TotalHoldingData>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      const data = await fetchTotalHoldingData(accessToken);
      setTotalHoldingData(data);
    };

    fetchData();
  }, []);

  return totalHoldingData;
};

export default useCryptoData;
