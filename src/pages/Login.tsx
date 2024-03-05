import { useState, FormEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';

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
        'https://solo-back-04d0.onrender.com/api/auth/login',
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        navigate('/App');
        console.log('Login successfully');
      } else {
        console.error('Invalid credentials:');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (signinRef.current && !signinRef.current.contains(e.target as Node)) {
        navigate('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

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
        </div>
      </div>
    </>
  );
};

export default Login;
