import React, { useState } from "react";
import DashboardPage from "./routes/dashboard/page";
import styles from './AdminDashBoard.module.css'
import { Sidebar } from "./layouts/sidebar";
import { Header } from "./layouts/header";



function AdminDashBoard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.app}>
      <Sidebar collapsed={collapsed} />
      <div className={`${styles.mainContent} ${collapsed ? styles.collapsedContent : ""}`}>
        <Header />
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        </button>
        <DashboardPage />
      </div>
    </div>
  );
}

export default AdminDashBoard;