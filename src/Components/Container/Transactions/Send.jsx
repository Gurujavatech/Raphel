import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { Client, Databases, Query, ID } from "appwrite";
import styles from "./Add.module.css";
import { useAuth } from "../../../Utilities/AuthContext";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d5ffab003bd6b6f70e");
const databases = new Databases(client);

const Send = ({ onClose }) => {
  const { user } = useAuth();
  const userId = user?.$id; 
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState("Bitcoin");
  const [message, setMessage] = useState("");
  const [transactionType, setTransactionType] = useState("credit"); 

  const walletLengths = {
    Bitcoin: { min: 26, max: 35 },
    Solana: { min: 44, max: 44 },
    Ethereum: { min: 42, max: 42 },
    Polygon: { min: 42, max: 42 },
    Base: { min: 42, max: 42 },
  };

  const validateWallet = () => {
    const walletLength = wallet.length;
    const { min, max } = walletLengths[selectedChain];

    if (walletLength < min || walletLength > max) {
      setMessage({ text: `Invalid wallet address for ${selectedChain}.`, type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check wallet validity
    if (!validateWallet()) return;

    const value = Number(amount); 

    if (!value || isNaN(value) || value <= 0) {
      setMessage({ text: "Please enter a valid amount.", type: "error" });
      return;
    }

    try {
      
      const coinBalanceResponse = await databases.listDocuments(
        "67df23180039007addf7", // Database ID
        "67e86fa90037250a7e96", // Coin Balance Collection ID
        [Query.equal("userId", userId), Query.equal("coin", selectedChain)] 
      );

      let coinBalanceDoc = coinBalanceResponse.documents[0] || null;
      let currentCoinBalance = coinBalanceDoc ? coinBalanceDoc.balance : 0;

      
      let newCoinBalance = transactionType === "debit" 
        ? currentCoinBalance - value 
        : currentCoinBalance - value;

      
      if (transactionType === "debit" && currentCoinBalance === 0) {
        setMessage({ text: "Cannot debit. Balance is zero.", type: "error" });
        return;
      }

      if (transactionType === "debit" && newCoinBalance < 0) {
        setMessage({ text: "Insufficient funds for this coin.", type: "error" });
        return;
      }

      
      if (coinBalanceDoc) {
        await databases.updateDocument(
          "67df23180039007addf7", // Database ID
          "67e86fa90037250a7e96", // Coin Balance Collection ID
          coinBalanceDoc.$id, 
          { balance: newCoinBalance } 
        );
      } else {
        await databases.createDocument(
          "67df23180039007addf7", // Database ID
          "67e86fa90037250a7e96", // Coin Balance Collection ID
          ID.unique(), 
          { userId, coin: selectedChain, balance: newCoinBalance } 
        );
      }

      
      const totalBalanceResponse = await databases.listDocuments(
        "67df23180039007addf7", // Database ID
        "67ec0c8d000ac8d30852", // Total Balance Collection ID
        [Query.equal("userId", userId)] 
      );

      const totalBalanceDoc = totalBalanceResponse.documents[0];
      const currentTotalBalance = totalBalanceDoc ? totalBalanceDoc.totalBalance : 0;

      
      let newTotalBalance = transactionType === "debit" 
        ? currentTotalBalance - value 
        : currentTotalBalance - value;

      
      if (transactionType === "debit" && currentTotalBalance === 0) {
        setMessage({ text: "Cannot debit from total balance. Balance is zero.", type: "error" });
        return;
      }

      if (transactionType === "debit" && newTotalBalance < 0) {
        setMessage({ text: "Insufficient total funds.", type: "error" });
        return;
      }

      
      if (totalBalanceDoc) {
        await databases.updateDocument(
          "67df23180039007addf7", 
          "67ec0c8d000ac8d30852", 
          totalBalanceDoc.$id, 
          { totalBalance: newTotalBalance } 
        );
      } else {
        await databases.createDocument(
          "67df23180039007addf7", 
          "67ec0c8d000ac8d30852", // Total Balance Collection ID
          ID.unique(), 
          { userId, totalBalance: newTotalBalance } 
        );
      }

      
      setMessage({ text: "Transaction successful!", type: "success" });
      setAmount("");
      onClose(); 
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage({ text: "Transaction failed.", type: "error" });
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

      {message && <p className={styles[message.type]}>{message.text}</p>}
    </div>
  );
};

export default Send;
