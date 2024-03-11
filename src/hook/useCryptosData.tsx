import { useEffect, useState } from 'react';
import {
  fetchTotalHoldingData,
  TotalHoldingData,
} from '../service/fetchTotalHolding';
// Adjust the path as necessary

const useCryptoData = () => {
  const [totalHoldingData, setTotalHoldingData] = useState<TotalHoldingData>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTotalHoldingData();
      setTotalHoldingData(data);
    };

    fetchData();
  }, []);

  return totalHoldingData;
};

export default useCryptoData;
