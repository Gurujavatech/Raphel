import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";
import styles from "./CryptoPrices.module.css";
import { useAuth } from "../../../Utilities/AuthContext";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d5ffab003bd6b6f70e");
const databases = new Databases(client);

const COINS = [
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { name: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "Base", logo: "https://cryptologos.cc/logos/base-base-logo.png" },
  { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.png" },
];

function CryptoPrices() {
  const [balances, setBalances] = useState({});
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchBalances = async () => {
      if (!user) {
        console.warn("No logged-in user found!");
        return;
      }

      try {
        console.log(`Fetching balances for user: ${user.$id}`);

        const response = await databases.listDocuments(
          "67df23180039007addf7", 
          "67e86fa90037250a7e96", 
          [Query.equal("userId", user.$id)] 
        );

        const userBalances = {};
        response.documents.forEach((doc) => {
          userBalances[doc.coin] = doc.balance; 
        });

        setBalances(userBalances);
      } catch (error) {
        console.error(" Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, [user]);

  return (
    <div className={styles["crypto-prices"]}>
      <h3>Your Balances</h3>
      <div className={styles["crypto-list"]}>
        {COINS.map((coin) => (
          <div key={coin.name} className={styles["crypto-card"]}>
            <img src={coin.logo} alt={coin.name} className={styles["coin-icon"]} />
            <span className={styles["coin-name"]}>{coin.name}</span>
            <span>${balances[coin.name] ? balances[coin.name].toFixed(2) : "0.00"} </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoPrices;
