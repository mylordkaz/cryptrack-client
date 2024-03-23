import './footer.css';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';

export default function Footer() {
  return (
    <>
      <footer className="footer-box">
        <span>
          &copy; {new Date().getFullYear()} Cryptrack. All rights reserved.
        </span>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/kevin-timsiline/">
            <img src={linkedin} alt="" />
          </a>
          <a href="https://github.com/mylordkaz">
            <img src={github} alt="" />
          </a>
        </div>
      </footer>
    </>
  );
}
