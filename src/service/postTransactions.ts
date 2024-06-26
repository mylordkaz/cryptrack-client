import axios from 'axios';

export const addTransaction = async (
  selectedCoin: string,
  selectedCryptoPrice: number,
  quantity: number
) => {
  try {
    const response = await axios.post(
      'https://cryptrack-server.onrender.com/transactions/add',
      { name: selectedCoin, price: selectedCryptoPrice, quantity: quantity },
      { withCredentials: true }
    );
    console.log('Transaction added:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to add transaction:', error);
    throw error;
  }
};
