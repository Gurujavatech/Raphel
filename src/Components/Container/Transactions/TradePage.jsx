import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TradePage.module.css";
import BottomNav from "../../BottomNav";
import NavBar from "../../NavBar/NavBar";

const TradePage = () => {
  const navigate = useNavigate();
  const [signalStrength, setSignalStrength] = useState(50);
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState([]); 

  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        const data = await response.json();
        setAssets(data); 
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  
  const handleTrade = (type) => {
    alert(`You have placed a ${type} trade!`);
  };

  return (
    <div className={styles.tradeContainer}>
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>
      <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {/* TradingView Chart
      <div className={styles.chartContainer}>
        <iframe
          title="TradingView Chart"
          src="https://www.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=1&theme=light&style=1&locale=en"
          width="100%"
          height="350px" // ✅ Smaller chart height
          frameBorder="0"
          allowTransparency="true"
          allowFullScreen
        ></iframe>
      </div> */}

      
      <div className={styles.progressBars}>
        <div className={styles.progressBar}>
          <span>Live Trade</span>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: "0%" }}></div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <span>Signal Strength</span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${signalStrength}%`,
                backgroundColor: signalStrength < 50 ? "red" : "green",
              }}
            ></div>
          </div>
        </div>
      </div>

      
      <button className={styles.tradeButton} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Trade Form" : "Trade"}
      </button>

      
      {showForm && (
        <div className={styles.swapForm}>
          <label>Type</label>
          <select>
            <option>Forex</option>
            <option>Crypto</option>
            <option>Stocks</option>
          </select>

          <label>Asset</label>
          <select>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <option key={asset.id} value={asset.symbol.toUpperCase()}>
                  {asset.name} ({asset.symbol.toUpperCase()})
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>

          <label>Amount</label>
          <input type="number" />

          <label>Duration</label>
          <select>
            <option>1 Hour</option>
            <option>2 Hours</option>
            <option>4 Hours</option>
          </select>

          <button className={styles.buyButton} onClick={() => handleTrade("Buy")}>
            Buy
          </button>
          <button className={styles.sellButton} onClick={() => handleTrade("Sell")}>
            Sell
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default TradePage;
