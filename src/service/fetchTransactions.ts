import axios from 'axios';

export const fetchTransactions = async (cryptoName: string) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `https://cryptrack-server.onrender.com/transactions/all?name=${cryptoName}`,
      {
        withCredentials: true,
      }
    );
    return response.data.transactions;
  } catch (error: any) {
    console.error('Error fetching transactions:', error.message);
    throw error;
  }
};
