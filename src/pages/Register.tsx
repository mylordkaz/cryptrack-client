import { useState, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../auth.css';
import useOutsideClick from '../hook/useOutsideClick';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const registerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3000/auth/Register', {
        email: email,
        username: username,
        password: password,
      });

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
  useOutsideClick(registerRef, () => {
    navigate('/');
  });

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
