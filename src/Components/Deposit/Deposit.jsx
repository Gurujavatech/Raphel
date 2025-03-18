import React, { useState } from "react";  
import { useNavigate } from "react-router-dom"; 
import styles from "./Deposit.module.css";
import { LuDollarSign } from "react-icons/lu";
import { toast } from "react-toastify";

const walletAddresses = {
  Solana: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
  Ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  Base: "0x8a1B4DcE89fDfC151B8753E50c6Dc35a1b3477C5",
  Polygon: "0x8dAeBADE922dF735c38C80C7eBD708Af50815fAa",
  Bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
};

const Deposit = ({ setBalance, onClose }) => {  
  const navigate = useNavigate();  
  const [selectedPayment, setSelectedPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDeposit = (e) => {
    e.preventDefault();
  
    if (!selectedPayment || amount <= 0 || !receipt) {
      toast.warning("Please fill in all fields and upload a receipt.");
      return;
    }
  
    const depositAmount = parseFloat(amount);
  
    if (typeof setBalance === "function") {
      setBalance((prevBalance) => prevBalance + depositAmount); 
    }
  
    toast.success("Deposit request submitted successfully!");
  
    if (typeof onClose === "function") {
      onClose();
    }

    navigate("/dashboard");  
  };

  return (
    <div className={styles.depositContainer}>
      <h3>Deposit | Fund your trading account</h3>

      <form className={styles.depositForm} onSubmit={handleDeposit}>
        <label>Deposit Method:</label>
        <select className={styles.select}
          value={selectedPayment}
          onChange={(e) => {
            setSelectedPayment(e.target.value);
            setShowPopup(true);
          }}
        >
          <option value="">Select Payment Method</option>
          {Object.keys(walletAddresses).map((crypto) => (
            <option key={crypto} value={crypto}>{crypto}</option>
          ))}
        </select>

        {showPopup && (
          <div className={styles.popup}>
            <p>Pay with <strong>{selectedPayment}</strong> to:</p>
            <span>{walletAddresses[selectedPayment]}</span>
            <button type="button" onClick={() => navigator.clipboard.writeText(walletAddresses[selectedPayment])}>
              Copy
            </button>
          </div>
        )}

        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <label>Upload Receipt:</label>
        <input type="file" accept="image/*,application/pdf" onChange={(e) => setReceipt(e.target.files[0])} />

        <button type="submit" className={styles.depositButton}>Proceed</button>
      </form>
    </div>
  );
};

export default Deposit;
