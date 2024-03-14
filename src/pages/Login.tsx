import { useState, FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';
import useOutsideClick from '../hook/useOutsideClick';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(
        'https://cryptrack-server.onrender.com/auth/login',
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        navigate('/App');
        console.log('Login successfully');
      } else {
        console.error('Invalid credentials:', response.data);
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
    }
  };

  useOutsideClick(signinRef, () => {
    navigate('/');
  });

  return (
    <>
      <div className="container" ref={signinRef}>
        <div className="mainform">
          <h3 className="auth-title">Sign-in</h3>

          <form className="signin" onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email"
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
            />
            <button className="submit" type="submit">
              Login
            </button>
          </form>
          <div className="switch-link">
            <Link to="/register">Not register yet?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
