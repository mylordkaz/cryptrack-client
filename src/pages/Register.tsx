import { useState, FormEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const registerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://solo-back-04d0.onrender.com/api/auth/Register',
        {
          email: email,
          username: username,
          password: password,
        }
      );

      if (response.status === 201) {
        navigate('/App');
        console.log('registration successful');
      } else {
        console.error('Invalid credentials:');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error during registration:', error.message);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        registerRef.current &&
        !registerRef.current.contains(e.target as Node)
      ) {
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
      <div className="container" ref={registerRef}>
        <div className="mainform">
          <h3 className="auth-title">Register</h3>

          <form className="signin" onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <button className="submit" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
