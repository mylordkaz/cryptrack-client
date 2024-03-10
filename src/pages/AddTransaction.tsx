import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../hook/useOutsideClick';
import '../add.css';
import useCryptoPrices from '../service/api/useCryptoPrices';

export default function AddTransaction() {
  const navigate = useNavigate();
  const transacRef = useRef<HTMLDivElement | null>(null);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const cryptoPrices = useCryptoPrices();

  useOutsideClick(transacRef, () => {
    navigate('/app');
  });

  useEffect(() => {
    if (cryptoPrices.length > 0) {
      setSelectedCoin(cryptoPrices[0].name);
    }
  }, [cryptoPrices]);

  const handleCoinChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoin(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseFloat(event.target.value) || 0);
  };

  const selectedCryptoPrice =
    cryptoPrices.find((crypto) => crypto.name === selectedCoin)?.price || 0;
  const total = selectedCryptoPrice * quantity;

  return (
    <>
      <div className="container" ref={transacRef}>
        <div className="transaction-form">
          <h3 className="transaction-title">Add Transactions</h3>

          <form className="signin">
            <div className="lab-in">
              <label htmlFor="currency">Select Coin</label>
              <select
                className="selection"
                id="currency"
                onChange={handleCoinChange}
                value={selectedCoin}
              >
                {cryptoPrices.map((crypto) => (
                  <option key={crypto.name} value={crypto.name}>
                    {crypto.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lab-in">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                placeholder=""
                onChange={handleQuantityChange}
              />
            </div>
            <div className="lab-in">
              <label htmlFor="">Price (per coin)</label>
              <input
                type="number"
                placeholder=""
                value={selectedCryptoPrice.toFixed(2)}
                readOnly
              />
            </div>

            <div className="lab-in">
              <label htmlFor="total">Total</label>
              <input
                type="text"
                id="total"
                value={`$ ${total.toFixed(2)}`}
                disabled
              />
            </div>

            <button className="submit" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
