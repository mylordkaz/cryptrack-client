import { useState, FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../auth.css';
import useOutsideClick from '../hook/useOutsideClick';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const registerRef = useRef<HTMLDivElement | null>(null);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      return;
    }
    const pwdRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!pwdRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 6 characters long, contain at least one uppercase letter, one symbol, and one number.',
      }));

      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        'https://cryptrack-server.onrender.com/auth/Register',
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
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
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
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <button className="submit" type="submit">
              Register
            </button>
          </form>
          <div className="switch-link">
            <Link to="/login">Already have a account?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
