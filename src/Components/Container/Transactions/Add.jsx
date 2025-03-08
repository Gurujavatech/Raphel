import React, { useState } from "react";
import { MdOutlineCallReceived } from "react-icons/md";
import styles from "./Add.module.css"; 

function Add({ setBalance, onClose }) {
  const [wallet, setWallet] = useState("1Lbcfr7sAHDC9CgdZo3HTMTkV8MN4ZnX71");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount <= 0) {
      alert("Enter valid Amount");
      return;
    }

    const newT = {
      wallet: wallet,
      amount: amount,
    };
    setBalance(newT);
    setWallet("");
    setAmount(0);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <h3>Receive Virtual Coins</h3>
      <form onSubmit={handleSubmit} className={styles.formControl}>
        <label>Receive USDT</label>
        <input
          type="text"
          placeholder="Enter wallet ID"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter receiving amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className={styles.btnRec}>
          Receive <MdOutlineCallReceived />
        </button>
      </form>
    </div>
  );
}

export default Add;
