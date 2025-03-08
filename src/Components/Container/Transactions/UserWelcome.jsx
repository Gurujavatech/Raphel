import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import TransactionsList from "./TransactionsList";
import styles from "./UserWelcome.module.css"; 

function UserWelcome({ user, transactions }) {  
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    console.log("Button Clicked! Previous State:", showHistory);
    setShowHistory(prev => !prev);
  };

  return (
    <div className={styles.sidebarContainer}>
      <FaUserCircle className={styles.userIcon} />
      <h3>Welcome, {user ? user.name : "User"}!</h3> 

      <button 
        onClick={toggleHistory} 
        className={styles.historyBtn}
      >
        {showHistory ? "Hide Transaction History" : "Check Transaction History"}
      </button>

      
      {showHistory && <TransactionsList transactions={transactions} />}
    </div>
  );
}

export default UserWelcome;
