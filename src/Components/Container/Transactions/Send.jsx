import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import styles from './Send.module.css'

function Send({ deductBalance, balance, onClose }) {
  const [wallet, setWallet] = useState("1Lbcfr7sAHDC9CgdZo3HTMTkV8MN4ZnX71");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const sendAmount = Number(amount); 
  
    if (isNaN(sendAmount) || sendAmount <= 0) {
      alert("Enter a valid amount.");
      return;
    }
  
    if (sendAmount > balance) {
      alert("Insufficient funds.");
      return;
    }
  
    console.log("Sending Amount:", sendAmount);
    console.log("Current Balance:", balance);
  
    const newT = {
      amount: sendAmount, 
    };
  
    deductBalance(newT); 
  
    setAmount("");
  
    if (onClose) {
      onClose(); 
    }
  };

  return (
    <div className={styles.modal}>
      <h3>Send Virtual Coins</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label>Send USDT</label>
          <input
            type="text"
            placeholder="Enter wallet ID"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className={styles.btnSend}>
            Transfer Funds <BsFillSendFill />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Send;