import React from "react";
import styles from "./TickerBar.module.css";

function TickerBar() {
  return (
    <div className={styles.tickerContainer}>
      <p className={styles.tickerText}>
        <small>
          Don't invest unless you're prepared to lose all the money you invest.
          This is a high-risk investment, and you should not expect to be
          protected if something goes wrong. <span><a href="https://phantom.com/en-GB">Take 2 minutes to learn</a></span> 
        </small>
      </p>
    </div>
  );
}

export default TickerBar;
