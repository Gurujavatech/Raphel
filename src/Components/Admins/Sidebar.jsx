import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>Raphel's Trade</h2>
      <hr />
      <p className={styles.adminText}>ADMIN</p>
      <ul>
        <li>🏠 Dashboard</li>
        <li>💰 Admin Wallet</li>
        <li>📄 Create Plan</li>
        <li>⚙️ Profile Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
