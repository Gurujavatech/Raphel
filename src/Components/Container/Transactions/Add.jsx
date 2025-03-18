import React, { useState } from "react";
import { MdOutlineCallReceived } from "react-icons/md";
import styles from "./Add.module.css"; 
import { useNavigate } from "react-router-dom";

function Add({ setBalance, onClose }) {
  const [wallet, setWallet] = useState("1Lbcfr7sAHDC9CgdZo3HTMTkV8MN4ZnX71");
  const [amount, setAmount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const navigate = useNavigate()

  const walletAddresses = {
    Solana: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
    Ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    Base: "0x8a1B4DcE89fDfC151B8753E50c6Dc35a1b3477C5",
    Polygon: "0x8dAeBADE922dF735c38C80C7eBD708Af50815fAa",
    Bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  };

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
    <div className={styles.depositContainer}>
      <h3>Receive Virtual Coins</h3>
      <button onClick={() => navigate("/dashboard")} className={styles.backButton}>
        ← Back to Dashboard
      </button>
      <form onSubmit={handleSubmit} className={styles.depositForm}>
        <label>Deposit Method:</label>
        <select
          className={styles.select}
          value={selectedPayment}
          onChange={(e) => {
            setSelectedPayment(e.target.value);
            setShowPopup(true);
          }}
        >
          <option value="">Select Payment Method</option>
          {Object.keys(walletAddresses).map((crypto) => (
            <option key={crypto} value={crypto}>
              {crypto}
            </option>
          ))}
        </select>

        {showPopup && selectedPayment && (
          <div className={styles.popup}>
            <p>
              Pay with <strong>{selectedPayment}</strong> to:
            </p>
            <div className={styles.addressBox}>
              <span>{walletAddresses[selectedPayment]}</span>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() =>
                  navigator.clipboard.writeText(walletAddresses[selectedPayment])
                }
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <label>Amount:</label>
        <input
          type="number"
          placeholder="Enter receiving amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Upload Receipt:</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setReceipt(e.target.files[0])}
        />

        <button type="submit" className={styles.depositButton}>
          Receive <MdOutlineCallReceived />
        </button>
      </form>
    </div>
  );
}

export default Add;
