import { useNavigate } from 'react-router-dom';
import '../setting.css';
import { useRef, useState } from 'react';
import useOutsideClick from '../hook/useOutsideClick';
import axios from 'axios';

export default function Setting() {
  const navigate = useNavigate();
  const setRef = useRef<HTMLDivElement | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      await axios.patch('https://cryptrack-server.onrender.com/user/update', {
        username,
        email,
        currentPassword,
        newPassword,
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  useOutsideClick(setRef, () => {
    navigate('/app');
  });
  return (
    <>
      <div ref={setRef} className="setting-page">
        <div className="set-header">
          <h1>Profile Settings</h1>
          <h3>About me</h3>
        </div>
        <form onSubmit={handleSave}>
          <div className="set-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="set-input">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
          </div>

          <h1>Modify password</h1>

          <div className="set-input">
            <label htmlFor="currentPasword">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="set-input">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=""
            />
          </div>

          <button type="submit" className="set-btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
