import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaChartBar, FaHistory, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu"; 
import styles from "./BottomNav.module.css";
import { useAuth } from "../Utilities/AuthContext";

const BottomNav = () => {
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.bottomNav} style={{ display: isMobile ? "flex" : "none" }}> 
      <NavLink to="/" className={styles.navItem}>
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/dashboard" className={styles.navItem}>
        <FaChartBar />
        <span>Dashboard</span>
      </NavLink>

      {/* <NavLink onClick={() => navigate("/transactions")} className={styles.navItem}>
        <FaHistory />
        <span>History</span>
      </NavLink> */}

      <NavLink to="/trade" className={styles.navItem}>
        <LuDollarSign />
        <span>Buy</span>
      </NavLink>

      {user ? (
        <button onClick={logout} className={styles.navItem}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      ) : (
        <NavLink to="/login" className={styles.navItem}>
          <FaSignInAlt />
          <span>Login</span>
        </NavLink>
      )}
    </nav>
  );
};

export default BottomNav;
