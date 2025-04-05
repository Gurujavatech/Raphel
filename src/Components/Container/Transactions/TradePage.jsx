import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TradePage.module.css";
import BottomNav from "../../BottomNav";
import NavBar from "../../NavBar/NavBar";

const TradePage = () => {
  const navigate = useNavigate();
  const [signalStrength, setSignalStrength] = useState(50);
  const [tradeType, setTradeType] = useState("Crypto");
  const [assets, setAssets] = useState([]);
  const [progress, setProgress] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [duration, setDuration] = useState("1 Hour");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProgress = localStorage.getItem("tradeProgress");
    if (savedProgress !== null) {
      setProgress(Number(savedProgress));
    }
  
    const savedSignal = localStorage.getItem("signalStrength");
    if (savedSignal !== null) {
      setSignalStrength(Number(savedSignal));
    }
  }, []);
  

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (tradeType === "Crypto") {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
          );
          const data = await response.json();
          setAssets(data);
        } else if (tradeType === "Forex") {
          setAssets([
            { id: "eurusd", name: "EUR/USD", symbol: "EURUSD" },
            { id: "gbpusd", name: "GBP/USD", symbol: "GBPUSD" },
          ]);
        } else if (tradeType === "Stocks") {
          setAssets([
            { id: "aapl", name: "Apple Inc.", symbol: "AAPL" },
            { id: "msft", name: "Microsoft Corp.", symbol: "MSFT" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [tradeType]);

  const handleTrade = (type) => {
    const tradeAmount = parseFloat(amount);
    if (isNaN(tradeAmount) || tradeAmount < 100) {
      setMessage("Trade amount cannot be below $100.");
      return;
    }

    // Simulate placing the trade
    setMessage(`You have placed a ${type} trade in ${tradeType}.`);

    // Reset form after successful trade
    setAmount("");
    setSelectedAsset("");
    setDuration("1 Hour");
  };

  return (
    <div className={styles.tradeContainer}>
      <div style={{ width: "100%" }}>
        <NavBar />
      </div>

      <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <div className={styles.progressBars}>
        <div className={styles.progressBar}>
          <span>Live Trade</span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%`, backgroundColor: "blue" }}
            ></div>
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

      <div className={styles.swapForm}>
        <label>Type</label>
        <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
          <option value="Forex">Forex</option>
          <option value="Crypto">Crypto</option>
          <option value="Stocks">Stocks</option>
        </select>

        <label>Asset</label>
        <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
          <option value="">Select an asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.symbol.toUpperCase()}>
              {asset.name} ({asset.symbol.toUpperCase()})
            </option>
          ))}
        </select>

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Duration</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
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

        {message && <p className={styles.message}>{message}</p>}
      </div>

      <BottomNav />
    </div>
  );
};

export default TradePage;
