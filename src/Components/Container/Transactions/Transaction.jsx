import React, { useState } from "react";
import styles from "./TransactionList.module.css";

function Transaction({ transaction, onApproveTransaction, onDeclineTransaction, isAdmin }) {
  const { transactionId, amount, status: initialStatus } = transaction;
  const [status, setStatus] = useState(initialStatus);

  const handleApprove = () => {
    onApproveTransaction(transactionId, amount);
    setStatus("Approved");
  };

  const handleDecline = () => {
    onDeclineTransaction(transactionId);
    setStatus("Declined");
  };

  return (
    <li className={transaction.amount >= 0 ? styles.plus : styles.minus}>
      <span> ${amount}</span>
      <span> {status}</span>

      {/* Only show buttons to Admin when status is "Pending" */}
      {isAdmin && status === "Pending" && (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleDecline} style={{ marginLeft: "10px", background: "red" }}>
            Decline
          </button>
        </>
      )}
    </li>
  );
}

export default Transaction;
