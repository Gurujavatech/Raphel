import { useState, useEffect } from "react";
import { Client, Databases, Query } from "appwrite";
import styles from "./Balance.module.css";
// import UserWelcome from "./UserWelcome";
import { useAuth } from "../../../Utilities/AuthContext"; 

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d5ffab003bd6b6f70e");
const databases = new Databases(client);

function Balance({ transactions = [] }) {
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  
  const { user } = useAuth();

  // Fetch user's total balance
  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!user) {
        console.warn(" No logged-in user found.");
        setLoading(false);
        return;
      }
  
      try {
        console.log("Fetching balances for user ID:", user?.$id);
  
        
        const totalBalanceResponse = await databases.listDocuments(
          "67df23180039007addf7", 
          "67ec0c8d000ac8d30852", 
          [Query.equal("userId", user.$id)] 
        );
  
        
  
        if (totalBalanceResponse.documents.length > 0) {
          const document = totalBalanceResponse.documents[0];
          
  
          
          const fetchedTotalBalance = document.totalBalance || 0; 
          setTotalBalance(fetchedTotalBalance);
        } else {
          console.warn("No balance found for user:", user?.$id);
          setTotalBalance(0);
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
      } finally {
        console.log(" Balance Fetch Completed");
        setLoading(false);
      }
    };
  
    if (user?.$id) {
      fetchUserBalance();
    }
  }, [user]);
    
  
  useEffect(() => {
    const fetchBTCPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"
        );
        const data = await response.json();

        if (data.length > 0) {
          setHigh(data[0].high_24h);
          setLow(data[0].low_24h);
        }
      } catch (error) {
        console.error("Error fetching BTC prices:", error);
      }
    };

    fetchBTCPrices();
  }, []); 

  return (
    <div className={styles.balanceContainer}>
      {/* <div className={styles.leftSection}>
        <UserWelcome user={user} transactions={transactions} />
      </div> */}

      <div className={styles.rightSection}>
        {/* <h2 className={styles.greeting}>
          Hello, {user ? user.name : "User"} 👍
        </h2> */}

        <div className={styles.balanceBox}>
          {loading ? (
            <h3>Loading Balance...</h3>
          ) : (
            <h3>${totalBalance.toLocaleString()}.00</h3> 
          )}
        </div>

        {high && low ? (
          <h4 className={styles.price}>
            +${high} <span>- ${low}</span>
          </h4>
        ) : (
          <h4 className={styles.price}>Loading BTC prices...</h4>
        )}
      </div>
    </div>
  );
}

export default Balance;
