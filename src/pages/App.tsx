import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard.tsx';
import CryptoTable from '../components/CryptoTable.tsx';
import DropDown from '../components/ui/DropDown.tsx';

export default function App() {
  return (
    <>
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <DropDown />
      </header>
      <OverviewCard />
      <CryptoTable />
      <footer></footer>
    </>
  );
}
