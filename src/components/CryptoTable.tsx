import './CryptoTable.css';
import add from '../assets/btn+.svg';

import useCryptoData from '../service/useCryptoData';
import useCryptoPrices from '../service/api/useCryptoPrices';

interface CryptoTableProps {
  onCryptoClick: (cryptoName: string) => void;
}

export default function CryptoTable({ onCryptoClick }: CryptoTableProps) {
  const totalHoldingData = useCryptoData();
  const cryptoPrices = useCryptoPrices();

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
