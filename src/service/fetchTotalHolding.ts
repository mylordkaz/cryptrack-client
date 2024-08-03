import axios from 'axios';

export interface TotalHoldingData {
  [cryptoName: string]: number;
}

// Separate fetching logic into its own function
export async function fetchTotalHoldingData(): Promise<TotalHoldingData> {
  try {
    const response = await axios.get(
      'https://cryptrack-server.onrender.com/transactions/total',
      {
        withCredentials: true,
      }
    );

    console.log(response.data.totalAmounts);
    return response.data.totalAmounts;
  } catch (error: any) {
    console.error('Failed to fetch total holding data:', error.message);
    return {};
  }
}
