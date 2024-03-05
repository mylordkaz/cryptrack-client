import wallet from '../assets/wallet.svg';
import logo from '../assets/logo.svg';
import login from '../assets/login.svg';
import { Link, Outlet } from 'react-router-dom';
import '../landing.css';

export default function Landing() {
  return (
    <>
      <header className="header">
        <div className="title">
          <img className="logo" src={logo} alt="logo" />
          <h1>Cryptrack</h1>
        </div>
        <div className="">
          <Link to="/login">
            <img src={login} alt="Sign In" className="signin-svg" />
            <span className="signin-text">Sign In</span>
          </Link>
        </div>
      </header>
      <Outlet />
      <main className="main">
        <div className="text">
          <span className="">Simplify</span>
          <span className="">Your Crypto</span>
          <span className="">Investment tracking</span>
        </div>
        <img className="wallet" src={wallet} alt="wallet-coin" />
        <Link className="main-btn" to="/register">
          <button className="landing-btn">Get started...</button>
        </Link>
      </main>
    </>
  );
}
