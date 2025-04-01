import React, { useState, useEffect } from "react";
import { MdOutlineCallReceived } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Client, Databases, Storage, ID, Account, Permission, Role } from "appwrite";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Add.module.css";


const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d5ffab003bd6b6f70e");

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

function Add({ onClose }) {
  const [amount, setAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get logged-in user ID
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);

  const walletAddresses = {
    Solana: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
    Ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    Base: "0x8a1B4DcE89fDfC151B8753E50c6Dc35a1b3477C5",
    Polygon: "0x8dAeBADE922dF735c38C80C7eBD708Af50815fAa",
    Bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPayment || amount <= 0) {
      setMessage({ type: "error", text: "Select a valid payment method and enter a valid amount" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      let receiptUrl = null;

      // Upload receipt if provided
      if (receipt) {
        const receiptUpload = await storage.createFile(
          "67df2ac5001763fb6c17", // Bucket ID
          ID.unique(),
          receipt,
          [
            Permission.read(Role.user(userId)),  // Allow user to read their file
            Permission.delete(Role.user(userId)) // Allow user to delete their file
          ]
        );

        receiptUrl = `https://cloud.appwrite.io/v1/storage/buckets/67df2ac5001763fb6c17/files/${receiptUpload.$id}/view`;
      }

      await databases.createDocument(
        "67df23180039007addf7", // Database ID
        "67df23aa003bdb971278", // Collection ID
        ID.unique(),
        {
          wallet: walletAddresses[selectedPayment],
          amount: parseFloat(amount),
          paymentMethod: selectedPayment,
          receiptUrl: receiptUrl,
          userId: userId,
          status: "Pending", // Always start as "Pending"
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      
      

     

      setMessage({ type: "success", text: "Deposit submitted successfully! Awaiting admin approval." });

      setAmount("");
      setReceipt(null);

      if (onClose) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      console.error("Error saving deposit:", error);
      setMessage({ type: "error", text: "Failed to submit deposit. Please try again." });
    }

    setLoading(false);
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
          required
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

        <button type="submit" className={styles.depositButton} disabled={loading}>
          {loading ? "Processing..." : "Receive"} <MdOutlineCallReceived />
        </button>

        {/* Success/Error Message Display */}
        {message.text && (
          <div className={message.type === "success" ? styles.successMsg : styles.errorMsg}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default Add;
