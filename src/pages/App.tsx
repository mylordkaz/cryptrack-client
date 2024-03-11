import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard.tsx';
import CryptoTable from '../components/CryptoTable.tsx';
import DropDown from '../components/ui/DropDown.tsx';
import TransactionTable from '../components/TransactionTable.tsx';
import { useEffect, useState } from 'react';
import useCryptoData from '../hook/useCryptosData.tsx';
import { Outlet } from 'react-router-dom';
import useCryptoPrice from '../hook/useCryptoPrice.tsx';

export default function App() {
  const [selectedCrypto, setSelectCrypto] = useState<string | null>(null);
  const [totalValue, setTotalValue] = useState<number>(0);
  const totalHoldingData = useCryptoData() || {};
  const cryptoPrices = useCryptoPrice() || [];

  const handleCryptoClick = (cryptoName: string) => {
    setSelectCrypto(cryptoName);
  };
  const handleBackClick = () => {
    setSelectCrypto(null);
  };

  useEffect(() => {
    const calculateTotalValue = () => {
      if (selectedCrypto) {
        // calculate for selected crypto
        const holdingAmount = totalHoldingData[selectedCrypto] || 0;
        const cryptoPrice =
          cryptoPrices.find(
            (crypto) =>
              crypto.name.toLowerCase() === selectedCrypto.toLowerCase()
          )?.price || 0;
        setTotalValue(holdingAmount * cryptoPrice);
      } else {
        // calculate for all cryptos
        const total = Object.entries(totalHoldingData).reduce(
          (acc, [cryptoName, holdingAmount]) => {
            const price =
              cryptoPrices.find(
                (crypto) =>
                  crypto.name.toLowerCase() === cryptoName.toLowerCase()
              )?.price || 0;
            return acc + price * holdingAmount;
          },
          0
        );
        setTotalValue(total);
      }
    };
    calculateTotalValue();
  }, [selectedCrypto, totalHoldingData, cryptoPrices]);

  return (
    <>
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <DropDown />
      </header>
      <OverviewCard totalValue={totalValue} />
      <Outlet />
      {selectedCrypto ? (
        <>
          <TransactionTable
            cryptoName={selectedCrypto}
            onBack={handleBackClick}
          />
        </>
      ) : (
        <>
          <CryptoTable
            onCryptoClick={handleCryptoClick}
            totalHoldingData={totalHoldingData}
            cryptoPrices={cryptoPrices}
          />
        </>
      )}

      <footer></footer>
    </>
  );
}
