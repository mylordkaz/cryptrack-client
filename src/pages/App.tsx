import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard.tsx';
import CryptoTable from '../components/CryptoTable.tsx';
import DropDown from '../components/ui/DropDown.tsx';
import TransactionTable from '../components/TransactionTable.tsx';
import { useState } from 'react';

export default function App() {
  const [selectedCrypto, setSelectCrypto] = useState<string | null>(null);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);

  const handleCryptoClick = (cryptoName: string) => {
    setSelectCrypto(cryptoName);
  };
  const handleBackClick = () => {
    setSelectCrypto(null);
  };

  return (
    <>
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <DropDown />
      </header>

      <OverviewCard totalPortfolioValue={totalPortfolioValue} />
      {selectedCrypto ? (
        <TransactionTable
          cryptoName={selectedCrypto}
          onBack={handleBackClick}
        />
      ) : (
        <CryptoTable
          onCryptoClick={handleCryptoClick}
          setTotalPortfolioValue={setTotalPortfolioValue}
        />
      )}

      <footer></footer>
    </>
  );
}
