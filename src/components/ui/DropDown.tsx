import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import './dropdown.css';
import useOutsideClick from '../../hook/useOutsideClick';

export default function DropDown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
            <Link className="drop-link" to="/logout">
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
