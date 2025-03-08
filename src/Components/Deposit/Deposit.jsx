import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Deposit.module.css";
import { LuDollarSign } from "react-icons/lu";

const Deposit = () => {
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        setCryptoOptions(data.map((coin) => coin.name));
      } catch (error) {
        console.error("Error fetching crypto assets:", error);
      }
    };

    fetchCryptoAssets();
  }, []);

  
  const handleDeposit = (e) => {
    e.preventDefault();
    if (!selectedPayment || amount <= 0 || !receipt) {
      alert("Please fill in all fields and upload a receipt.");
      return;
    }

    alert("Deposit request submitted successfully!");
    navigate("/dashboard"); 
  };

  return (
    <div className={styles.depositContainer}>
      <h3><LuDollarSign /> Deposit | Fund your trading account</h3>

      <form className={styles.depositForm} onSubmit={handleDeposit}>
        <label>Deposit Method:</label>
        <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
          <option value="">Select Payment Method</option>
          {cryptoOptions.map((asset, index) => (
            <option key={index} value={asset}>
              {asset}
            </option>
          ))}
        </select>

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Upload Payment Receipt:</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setReceipt(e.target.files[0])}
        />
        {receipt && <p className={styles.receiptName}>Uploaded: {receipt.name}</p>}

        <button type="submit" className={styles.depositButton}>
          Proceed
        </button>
      </form>
    </div>
  );
};

export default Deposit;
