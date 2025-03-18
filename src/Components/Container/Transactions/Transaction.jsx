import React from "react";
import styles from "./TransactionList.module.css";

function Transaction({ transaction }) {
  if (!transaction || transaction.amount === undefined) return null; // ✅ Prevent errors

  const amount = Number(transaction.amount).toFixed(2);
  const sign = transaction.amount >= 0 ? "+" : "-";

  return (
    <li className={transaction.amount >= 0 ? styles.plus : styles.minus}>
      <span>{sign} ${Math.abs(amount)}</span>
    </li>
  );
}

export default Transaction;
