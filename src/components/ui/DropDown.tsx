import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import './dropdown.css';
import useOutsideClick from '../../hook/useOutsideClick';
import { logout } from '../../service/AuthService';

export default function DropDown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const successLogout = await logout();

    if (successLogout) {
      navigate('/');
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <div className="drop-menu">
        <button onClick={toggleDropdown}>
          <img className="menu-btn" src={menu} alt="menu button" />
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="dropdown">
            <Link className="drop-link" to="/settings">
              Settings
            </Link>
            <button className="drop-link" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
