import { useNavigate } from 'react-router-dom';
import '../setting.css';
import { useRef, useState } from 'react';
import useOutsideClick from '../hook/useOutsideClick';
import axios from 'axios';
import DeleteAccountModal from '../components/DeleteAccountModal';

export default function Setting() {
  const navigate = useNavigate();
  const setRef = useRef<HTMLDivElement | null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        'https://cryptrack-server.onrender.com/user/delete-account',
        {
          withCredentials: true,
        }
      );
      alert('Account deleted successfully.');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert('Failed to delete account.');
    }
  };

  useOutsideClick(setRef, () => {
    navigate('/app');
  });
  return (
    <>
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
      <div ref={setRef} className="setting-page">
        <div className="set-header">
          <h1>Profile Settings</h1>
          <h3>About me</h3>
        </div>
        <form onSubmit={handleSave}>
          <h1>Modify User Informations</h1>

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
        <div className="delete-container">
          <h1>Delete your account</h1>
          <span>Click the button bellow to delete your account.</span>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
