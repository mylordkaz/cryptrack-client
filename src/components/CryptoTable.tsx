import './CryptoTable.css';
import add from '../assets/btn+.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  name: string;
  price: number;
}
interface CryptoTableProps {
  onCryptoClick: (cryptoName: string) => void;
  setTotalPortfolioValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function CryptoTable({
  onCryptoClick,
  setTotalPortfolioValue,
}: CryptoTableProps) {
  const [totalHoldingData, setTotalHoldingData] = useState<
    Record<string, number>
  >({});
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData[]>([]);

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
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          if (axiosError.response) {
            console.error(
              'Server responded with error:',
              axiosError.response.data
            );
          } else if (axiosError.request) {
            console.error(
              'No response received from the server:',
              axiosError.request
            );
          } else {
            console.error('Error setting up the request:', axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          console.error('Non-Axios error:', error.message);
        }
      }
    };

    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/cryptos/prices',
          {
            withCredentials: true,
          }
        );

        setCryptoPrices(response.data.cryptoPrices as CryptoData[]);
        console.log(response.data.cryptoPrices);
      } catch (error: any) {
        console.error('Error fetching crypto prices:', error.message);
      }
    };

    const calculateTotalportfolioValue = () => {
      let sum = 0;
      Object.entries(totalHoldingData).forEach(
        ([cryptoName, holdingAmount]) => {
          const crypto = cryptoPrices.find(
            ({ name }) =>
              name.toLocaleLowerCase() === cryptoName.toLocaleLowerCase()
          );
          const price = crypto ? crypto.price : 0;
          const totalValue = price * holdingAmount;
          sum += totalValue;
        }
      );

      setTotalPortfolioValue(sum);
    };

    fetchData();
    fetchCryptoPrices();
    calculateTotalportfolioValue();
  }, []);

  const handleCryptoRowClick = (cryptoName: string) => {
    onCryptoClick(cryptoName);
  };

  return (
    <>
      <div className="crypto-container">
        <div className="crypto-table">
          <div className="crypto-nav">
            <span>Assets</span>
            <button>
              <img src={add} alt="+ button" />
            </button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Holding</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(totalHoldingData).map(
                  ([cryptoName, holdingAmount]) => {
                    const crypto = cryptoPrices.find(
                      ({ name }) =>
                        name.toLocaleLowerCase() ===
                        cryptoName.toLocaleLowerCase()
                    );

                    const price = crypto ? crypto.price : 0;
                    const totalValue = price * holdingAmount;
                    return (
                      <tr
                        key={cryptoName}
                        onClick={() => handleCryptoRowClick(cryptoName)}
                      >
                        <td>{cryptoName}</td>
                        <td>${price.toLocaleString()}</td>
                        <td>
                          {`$ ${totalValue.toFixed(3)} `} <br /> {holdingAmount}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
