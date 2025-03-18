import React from "react";
import styles from "./TickerBar.module.css";
import { Link } from "react-router-dom";


function TickerBar() {
  return (
    <div className={styles.tickerContainer}>
      <p className={styles.tickerText}>
        <small>
          Don't invest unless you're prepared to lose all the money you invest.
          This is a high-risk investment, and you should not expect to be
          protected if something goes wrong.   <span>
            <Link to="/swap" className={styles.link}> Take 2 minutes to learn</Link>
          </span>
        </small>
      </p>
    </div>
  );
}

export default TickerBar;
