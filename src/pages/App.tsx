import logo from '../assets/logo.svg';
import '../App.css';
import OverviewCard from '../components/OverviewCard';

export default function App() {
  return (
    <>
      <header>
        <img className="app-logo" src={logo} alt="" />
      </header>
      <OverviewCard />
      <div></div>
      <footer></footer>
    </>
  );
}
