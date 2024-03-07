import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard.tsx';
import CryptoTable from '../components/CryptoTable.tsx';
import menu from '../assets/menu.svg';

export default function App() {
  return (
    <>
      <header className="app-header">
        <img className="app-logo" src={logo} alt="" />
        <button>
          <img className="menu-btn" src={menu} alt="menu button" />
        </button>
      </header>
      <OverviewCard />
      <CryptoTable />
      <footer></footer>
    </>
  );
}
