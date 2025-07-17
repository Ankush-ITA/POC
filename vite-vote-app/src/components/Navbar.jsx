import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/faair-logo.png";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ onToggleMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="navbar">
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={onToggleMobileMenu}>
        <GiHamburgerMenu />
      </div>

      <img className="company-logo" src={logo} alt="logo" />

      <div className="navbar-profile" ref={dropdownRef}>
        <FaUserCircle className="profile-icon" onClick={toggleDropdown} />

        {dropdownOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-item">Login ID: user@example.com</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item logout">Logout</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
