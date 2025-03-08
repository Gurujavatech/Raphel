import React, { useState, useEffect } from "react";
import Add from "./Add";
import Send from "./Send";
import styles from "./ReceiveIcon.module.css";
import { LuDollarSign } from "react-icons/lu";
import { RiSwap3Fill } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { FaRotate } from "react-icons/fa6";

function ReceiveIcon({ setBalance, deductBalance, transactions = [] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [selectedType, setSelectedType] = useState("Crypto");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("1 Hour");
  const [swapAction, setSwapAction] = useState("Swap"); 

  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        setCryptoOptions(data.map((coin) => coin.name));
      } catch (error) {
        console.error("Error fetching crypto assets:", error);
      }
    };

    fetchCryptoAssets();
  }, []);

  const handleSwap = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const totalBalance = transactions.reduce((acc, t) => acc + Number(t.amount), 0);

  return (
    <div>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.btn} ${styles.receive}`}
          onClick={() => {
            setShowAdd(!showAdd);
            setShowSend(false);
            setShowSwap(false);
            setShowDeposit(false);
          }}
        >
          <div className={styles.iconText}>
            <RiSwap3Fill size={25} color="purple" />
            <span>Receive</span>
          </div>
        </button>

        <button
          className={`${styles.btn} ${styles.send}`}
          onClick={() => {
            setShowSend(!showSend);
            setShowAdd(false);
            setShowSwap(false);
            setShowDeposit(false);
          }}
        >
          <div className={styles.iconText}>
            <FiSend size={25} color="purple" />
            <span>Send</span>
          </div>
        </button>

        <button
          className={`${styles.btn} ${styles.swap}`}
          onClick={() => {
            setShowSwap(!showSwap);
            setShowAdd(false);
            setShowSend(false);
            setShowDeposit(false);
          }}
        >
          <div className={styles.iconText}>
            <FaRotate size={25} color="purple" />
            <span>Swap</span>
          </div>
        </button>

        <button
          className={`${styles.btn} ${styles.deposit}`}
          onClick={() => {
            setShowDeposit(!showDeposit);
            setShowAdd(false);
            setShowSend(false);
            setShowSwap(false);
          }}
        >
          <div className={styles.iconText}>
            <LuDollarSign size={25} color="purple" />
            <span>Deposit</span>
          </div>
        </button>
      </div>

      
      {showSwap && (
        <form className={styles.swapForm} onSubmit={handleSwap}>
          
          <div className={styles.swapNav}>
            <button
              type="button"
              className={swapAction === "Buy" ? styles.active : ""}
              onClick={() => setSwapAction("Buy")}
            >
              Buy
            </button>
            <button
              type="button"
              className={swapAction === "Sell" ? styles.active : ""}
              onClick={() => setSwapAction("Sell")}
            >
              Sell
            </button>
            <button
              type="button"
              className={swapAction === "Convert" ? styles.active : ""}
              onClick={() => setSwapAction("Convert")}
            >
              Convert
            </button>
          </div>

          <label>Type:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="Forex">Forex</option>
            <option value="Crypto">Crypto</option>
            <option value="Stocks">Stocks</option>
          </select>

          <label>Asset:</label>
          <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
            <option value="">Select an asset</option>
            {cryptoOptions.map((asset, index) => (
              <option key={index} value={asset}>
                {asset}
              </option>
            ))}
          </select>

          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

          <label>Duration:</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="1 Hour">1 Hour</option>
            <option value="2 Hours">2 Hours</option>
            <option value="4 Hours">4 Hours</option>
            <option value="1 Day">1 Day</option>
          </select>

          <button type="submit" className={styles.swapButton}>{swapAction}</button>
        </form>
      )}

      {showAdd && <Add setBalance={setBalance} onClose={() => setShowAdd(false)} />}
      {showSend && <Send deductBalance={deductBalance} balance={totalBalance} onClose={() => setShowSend(false)} />}
    </div>
  );
}

export default ReceiveIcon;
