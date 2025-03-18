import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./Add.module.css"; 

function Send({ deductBalance, balance, onClose }) {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState("Bitcoin");

  
  const walletLengths = {
    Bitcoin: { min: 26, max: 35 },
    Solana: { min: 44, max: 44 },
    Ethereum: { min: 42, max: 42 },
    Polygon: { min: 42, max: 42 },
    Base: { min: 42, max: 42 },
  };

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

    
    const walletLength = wallet.length;
    const { min, max } = walletLengths[selectedChain];

    if (walletLength < min || walletLength > max) {
      alert(`Please enter a valid ${selectedChain} wallet ID.`);
      return;
    }

    console.log("Sending Amount:", sendAmount);
    console.log("Current Balance:", balance);

    const newT = {
      amount: -sendAmount, 
    };

    deductBalance(newT);

    setAmount("");
    setWallet("");

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.depositContainer}>
      <h3>Send Virtual Coins</h3>
      <form onSubmit={handleSubmit} className={styles.depositForm}>
        <label>Select Blockchain:</label>
        <select
          className={styles.select}
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          <option value="Bitcoin">Bitcoin</option>
          <option value="Solana">Solana</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
          <option value="Base">Base</option>
        </select>

        <label>Wallet ID:</label>
        <input
          type="text"
          placeholder="Enter recipient wallet ID"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />

        <label>Send USDT:</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit" className={styles.depositButton}>
          Transfer Funds <BsFillSendFill />
        </button>
      </form>
    </div>
  );
}

export default Send;
