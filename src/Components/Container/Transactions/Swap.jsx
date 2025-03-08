import React, { useState } from "react";
import styles from "./Swap.module.css";

const Swap = ({ onClose }) => {
  const [type, setType] = useState("Forex");
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("1 hour");

  const handleSwap = (e) => {
    e.preventDefault();
    alert(`Swapped ${amount} of ${asset} in ${type} for ${duration}`);
    window.location.reload();
  };

  return (
    <div className={styles.swapContainer}>
      <h3>Swap Assets</h3>
      <form onSubmit={handleSwap}>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Forex">Forex</option>
          <option value="Crypto">Crypto</option>
          <option value="Stocks">Stocks</option>
        </select>

        <label>Asset:</label>
        <input type="text" value={asset} onChange={(e) => setAsset(e.target.value)} required />

        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <label>Duration:</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="1 hour">1 hour</option>
          <option value="2 hours">2 hours</option>
          <option value="6 hours">6 hours</option>
        </select>

        <button type="submit" className={styles.swapButton}>Swap</button>
        <button type="button" className={styles.closeButton} onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Swap;
