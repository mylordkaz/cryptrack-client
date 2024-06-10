import axios from 'axios';

export const fetchTransactions = async (cryptoName: string) => {
  try {
    const response = await axios.get(
      `https://cryptrack-server.onrender.com/transactions/all?name=${cryptoName}`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        withCredentials: true,
      }
    );
    return response.data.transactions;
  } catch (error: any) {
    console.error('Error fetching transactions:', error.message);
    throw error;
  }
};
