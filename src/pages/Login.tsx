import { useState, FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';
import useOutsideClick from '../hook/useOutsideClick';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const signinRef = useRef<HTMLDivElement | null>(null);

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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Login'}
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
