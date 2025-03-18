import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <button className={styles.menuBtn}>☰</button>
      <div className={styles.rightSection}>
        <span>🔔 Notifications</span>
        <span>⚡ Quick Actions</span>
        <div className={styles.profile}>👤</div>
      </div>
    </nav>
  );
};

export default Navbar;
