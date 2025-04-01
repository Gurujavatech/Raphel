import React, { useState, useEffect } from 'react'
import styles from "./TradePage.module.css";

function Signal() {
    const [signalStrength, setSignalStrength] = useState(50);
    const [progress, setProgress] = useState(0);
    const [, forceUpdate] = useState(0); 

    useEffect(() => {
      const savedProgress = localStorage.getItem("tradeProgress");
      if (savedProgress !== null) {
        setProgress(Number(savedProgress));
        forceUpdate((prev) => prev + 1); // Force component re-render
      }
    }, []);
  return (
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
  )
}

export default Signal
