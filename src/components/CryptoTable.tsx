import './CryptoTable.css';
import add from '../assets/btn+.svg';
import { Link } from 'react-router-dom';
import { useTransactionContext } from '../context/TransactionContext';

interface CryptoTableProps {
  onCryptoClick: (cryptoName: string) => void;
  totalHoldingData: { [cryptoName: string]: number };
  cryptoPrices: { name: string; price: number }[];
}

export default function CryptoTable({ onCryptoClick }: CryptoTableProps) {
  const { totalHoldingData, cryptoPrices } = useTransactionContext();
  const handleCryptoRowClick = (cryptoName: string) => {
    onCryptoClick(cryptoName);
  };

  if (!totalHoldingData || !cryptoPrices) {
    // return a loading indicator, or null to render nothing
    return null;
  }
  return (
    <>
      <div className="crypto-container">
        <div className="crypto-table">
          <div className="crypto-nav">
            <span>Assets</span>
            <button>
              <Link to="/app/add">
                <img src={add} alt="+ button" />
              </Link>
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

// const calculateTotalportfolioValue = () => {
//   let sum = 0;
//   Object.entries(totalHoldingData).forEach(([cryptoName, holdingAmount]) => {
//     const crypto = cryptoPrices.find(
//       ({ name }) =>
//         name.toLocaleLowerCase() === cryptoName.toLocaleLowerCase()
//     );
//     const price = crypto ? crypto.price : 0;
//     const totalValue = price * holdingAmount;
//     sum += totalValue;
//   });
// };
