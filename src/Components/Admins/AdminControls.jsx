import React from "react";
import styles from "./AdminControls.module.css";

const AdminControls = () => {
  return (
    <div className={styles.adminControls}>
      <h3>Admin Actions</h3>
      <button className={styles.btn}>✔ Approve Deposits</button>
      <button className={styles.btn}>💸 Send Funds</button>
      <button className={styles.btn}>🔄 Update Balances</button>
    </div>
  );
};

export default AdminControls;
