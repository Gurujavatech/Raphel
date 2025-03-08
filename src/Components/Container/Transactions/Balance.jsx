import React, { useState, useEffect } from "react";
import styles from "./Balance.module.css";
import UserWelcome from "./UserWelcome";

function Balance({ user, transactions = [] }) {
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);

  const amount = Array.isArray(transactions)
    ? transactions.map((transaction) => Number(transaction.amount))
    : [];
  const total = amount.reduce((acc, i) => acc + i, 0);

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
      <div className={styles.leftSection}>
        <UserWelcome user={user} transactions={transactions} />
      </div>

      
      <div className={styles.rightSection}>
        <h2 className={styles.greeting}>
          Hello, {user ? user.name : "User"} 👍
        </h2>

        <div className={styles.balanceBox}>
          <h3>Your balance is ${total.toLocaleString()}</h3>
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
