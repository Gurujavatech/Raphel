import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases, ID, Query } from "appwrite";
import styles from "./ManageUsers.module.css"; 
import { useLocation } from "react-router-dom";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d5ffab003bd6b6f70e");
const databases = new Databases(client);

const ManageUsers = () => {
  const { userId } = useParams();
  const [cryptoBalances, setCryptoBalances] = useState({});
  const [amount, setAmount] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("Solana");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0); 
  const { state } = useLocation();

  const [progress, setProgress] = useState(() => {
    return Number(localStorage.getItem("tradeProgress") || 0);
  });
  const [signalStrength, setSignalStrength] = useState(() => {
    return Number(localStorage.getItem("signalStrength") || 50);
  });
  


  const user = state?.user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const balancesResponse = await databases.listDocuments(
          "67df23180039007addf7", 
          "67e86fa90037250a7e96", 
          [Query.equal("userId", userId)]
        );

        const balances = {};
        let total = 0;

        balancesResponse.documents.forEach((doc) => {
          balances[doc.coin] = doc.balance;
          total += doc.balance;
        });

        setCryptoBalances(balances);
        setTotalBalance(total);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage({ text: "Error fetching user data", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleTransaction = async (type) => {
    const isCredit = type === "credit";
    const value = isCredit ? amount : debitAmount;
  
    if (!value || isNaN(value) || value <= 0) {
      setMessage({ text: "Please enter a valid amount.", type: "error" });
      return;
    }
  
    try {
      
      const balancesResponse = await databases.listDocuments(
        "67df23180039007addf7", 
        "67e86fa90037250a7e96", 
        [Query.equal("userId", userId), Query.equal("coin", selectedCrypto)] 
      );
  
      let balanceDoc = balancesResponse.documents[0] || null;
      let currentBalance = balanceDoc ? balanceDoc.balance : 0;
      let newBalance = isCredit ? currentBalance + Number(value) : currentBalance - Number(value);
  
      
      if (!isCredit && currentBalance === 0) {
        setMessage({ text: "Cannot debit. Balance is zero.", type: "error" });
        return;
      }
  
      if (!isCredit && newBalance < 0) {
        setMessage({ text: "Insufficient funds.", type: "error" });
        return;
      }
  
      
      if (balanceDoc) {
        await databases.updateDocument(
          "67df23180039007addf7", 
          "67e86fa90037250a7e96", 
          balanceDoc.$id, 
          { balance: newBalance } 
        );
      } else {
        await databases.createDocument(
          "67df23180039007addf7", 
          "67e86fa90037250a7e96", 
          ID.unique(), 
          { userId, coin: selectedCrypto, balance: newBalance } 
        );
      }
  
      
      setCryptoBalances((prev) => {
        const updatedBalances = { ...prev, [selectedCrypto]: newBalance };
        const newTotal = Object.values(updatedBalances).reduce((acc, curr) => acc + curr, 0);
        setTotalBalance(newTotal); 
        return updatedBalances;
      });
  
      
      const totalBalanceResponse = await databases.listDocuments(
        "67df23180039007addf7", // Database ID
        "67ec0c8d000ac8d30852", // Total Balance Collection ID
        [Query.equal("userId", userId)]
      );
  
      
      const newTotalBalance = totalBalance; 
  
      if (totalBalanceResponse.documents.length > 0) {
        await databases.updateDocument(
          "67df23180039007addf7", 
          "67ec0c8d000ac8d30852", 
          totalBalanceResponse.documents[0].$id, 
          { totalBalance: newTotalBalance } 
        );
      } else {
        await databases.createDocument(
          "67df23180039007addf7", 
          "67ec0c8d000ac8d30852", 
          ID.unique(), // New document ID
          { userId, totalBalance: newTotalBalance } // Create new total balance document
        );
      }
  
      setMessage({ text: "Transaction successful!", type: "success" });
      setAmount("");
      setDebitAmount("");
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage({ text: "Transaction failed.", type: "error" });
    }
  };
  
  

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <h2>Manage {user.name}</h2>

          
          <div className={styles.card}>
            <h3>Total Balance</h3>
            <p>${totalBalance.toFixed(2)}</p>
          </div>

          <div className={styles.cards}>
            {["Solana", "Bitcoin", "Ethereum", "Base", "Polygon"].map((coin) => (
              <div className={styles.card} key={coin}>
                <h3>{coin} Balance</h3>
                <p>${cryptoBalances[coin]?.toFixed(2) || "0.00"}</p>
              </div>
            ))}
          </div>

          <div className={styles.formsContainer}>
            
            <form
              className={styles.creditForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleTransaction("credit");
              }}
            >
              <h3>Credit User</h3>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className={styles.dropdown}
              >
                {["Solana", "Bitcoin", "Ethereum", "Base", "Polygon"].map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button type="submit">Credit User</button>
            </form>

            
            <form
              className={styles.debitForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleTransaction("debit");
              }}
            >
              <h3>Debit User</h3>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className={styles.dropdown}
              >
                {["Solana", "Bitcoin", "Ethereum", "Base", "Polygon"].map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Enter debit amount"
                value={debitAmount}
                onChange={(e) => setDebitAmount(e.target.value)}
                required
              />
              <button type="submit">Debit User</button>
            </form>
          </div>

          {message.text && (
            <p className={message.type === "success" ? styles.successMessage : styles.errorMessage}>
              {message.text}
            </p>
          )}
        </>
      )}
      <div className={styles.progressCard}>
  <div className={styles.rangeLabel}>Trade Progress: {progress}%</div>
  <div className={styles.sliderWrapper}>
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={(e) => {
        const value = Number(e.target.value);
        setProgress(value);
        localStorage.setItem("tradeProgress", value);
      }}
    />
  </div>
</div>

<div className={styles.progressCard}>
  <div className={styles.rangeLabel}>Signal Strength: {signalStrength}%</div>
  <div className={styles.sliderWrapper}>
    <input
      type="range"
      min="0"
      max="100"
      value={signalStrength}
      onChange={(e) => {
        const value = Number(e.target.value);
        setSignalStrength(value);
        localStorage.setItem("signalStrength", value);
      }}
    />
  </div>
</div>


    </div>
  );
};

export default ManageUsers;
