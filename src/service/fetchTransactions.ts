import axios from 'axios';

export const fetchTransactions = async (cryptoName: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/transactions/all?name=${cryptoName}`,
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
