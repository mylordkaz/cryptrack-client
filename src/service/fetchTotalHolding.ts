import axios from 'axios';

export interface TotalHoldingData {
  [cryptoName: string]: number;
}

// Separate fetching logic into its own function
export async function fetchTotalHoldingData(): Promise<TotalHoldingData> {
  try {
    const response = await axios.get(
      'http://localhost:3000/transactions/total',
      {
        withCredentials: true,
      }
    );

    console.log(response.data.totalAmounts); // Optional: You might want to remove this or use a more formal logging approach
    return response.data.totalAmounts;
  } catch (error: any) {
    console.error('Failed to fetch total holding data:', error.message);
    return {}; // Return an empty object or handle the error as needed
  }
}
