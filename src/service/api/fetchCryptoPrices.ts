import axios from 'axios';

export interface CryptoData {
  name: string;
  price: number;
}

// Separate fetching logic into its own function
export async function fetchCryptoPrices(): Promise<CryptoData[]> {
  const cacheKey = 'cryptoPrices';
  const cacheData = localStorage.getItem(cacheKey);

  if (cacheData) {
    const { data, timestamp } = JSON.parse(cacheData);
    const now = new Date();

    if (now.getTime() - timestamp < 5 * 60 * 1000) {
      return data;
    }
  }

  try {
    const response = await axios.get('http://localhost:3000/cryptos/prices', {
      withCredentials: true,
    });
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: response.data.cryptoPrices,
        timestamp: new Date().getTime(),
      })
    );
    return response.data.cryptoPrices as CryptoData[];
  } catch (error: any) {
    console.error('Error fetching crypto prices:', error.message);
    return []; // Return an empty array or handle the error as needed
  }
}
