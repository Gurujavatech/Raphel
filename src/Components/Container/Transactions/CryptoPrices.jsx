import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './CryptoPrices.module.css'; 

function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            }
          }
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <div className={styles["crypto-prices"]}>
      <h3>Crypto Prices</h3>
      <div className={styles["crypto-list"]}>
        {cryptoData.length > 0 ? (
          cryptoData.map((coin) => (
            <div key={coin.id} className={styles["crypto-card"]}>
              <img src={coin.image} alt={coin.name} className={styles["coin-icon"]} />
              <span className={styles["coin-name"]}>{coin.name}</span>
              <span className={styles["coin-price"]}>${coin.current_price.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p>Loading crypto prices...</p>
        )}
      </div>
    </div>
  );
}

export default CryptoPrices;
