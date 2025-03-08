import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/AuthContext"; 
function NavBar() {
  const { user, logoutUser } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
    setMenuOpen(false); 
  };

  const closeMenu = () => {
    setMenuOpen(false); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">phantom</a>
      </div>

      {/* Mobile & Desktop Nav */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li><a href="/" onClick={closeMenu}>Security</a></li>
        <li><a href="https://phantom.com/" onClick={closeMenu}>Learn</a></li>
        <li><a href="/" onClick={closeMenu}>Explore</a></li>
        <li><a href="/" onClick={closeMenu}>Support</a></li>
        <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
        {user && <li><button onClick={handleLogout} className={styles.btn}>Logout</button></li>}
      </ul>

      {/* Hamburger Menu - Only visible on mobile */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default NavBar;
