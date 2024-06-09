import { useState, FormEvent, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/auth.css';
import useOutsideClick from '../hook/useOutsideClick';
import { AuthContext } from '../context/AuthContext';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const registerRef = useRef<HTMLDivElement | null>(null);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { register } = useContext(AuthContext)!;

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
      await register(username, email, password);
      navigate('/App');
      console.log('registration successful');
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
