import wallet from '../assets/wallet.svg';
import logo from '../assets/logo.svg';
import login from '../assets/login.svg';
import { Link, Outlet } from 'react-router-dom';
import '../landing.css';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    document.title = 'Cryptrack - web app';
  }, []);
  return (
    <>
      <header className="header">
        <div className="title">
          <img className="logo" src={logo} alt="logo" />
          <h1>Cryptrack</h1>
        </div>
        <button className="login-btn">
          <Link to="/login">
            <img src={login} alt="Sign In" className="signin-svg" />
            <span className="signin-text">Login</span>
          </Link>
        </button>
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
      <Footer />
    </>
  );
}
