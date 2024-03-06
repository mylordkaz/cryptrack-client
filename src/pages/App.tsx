import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard.tsx';
import CryptoTable from '../components/cryptoTable.tsx';

export default function App() {
  return (
    <>
      <header>
        <img className="app-logo" src={logo} alt="" />
      </header>
      <OverviewCard />
      <CryptoTable />
      <footer></footer>
    </>
  );
}
