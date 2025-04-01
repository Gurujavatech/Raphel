import React, { useState } from "react";
import Transaction from "./Transaction";
import styles from "./TransactionList.module.css";

function TransactionsList({ transactions = [], isAdmin }) {
  const [transactionList, setTransactionList] = useState(transactions);

  // Function to approve transaction
  const handleApproveTransaction = (transactionId, amount) => {
    const updatedTransactions = transactionList.map((transaction) =>
      transaction.transactionId === transactionId
        ? { ...transaction, status: "Approved" }
        : transaction
    );
    setTransactionList(updatedTransactions);
    console.log(`✅ Approved transaction: ID=${transactionId}, Amount=${amount}`);
  };

  // Function to decline transaction
  const handleDeclineTransaction = (transactionId) => {
    const updatedTransactions = transactionList.map((transaction) =>
      transaction.transactionId === transactionId
        ? { ...transaction, status: "Declined" }
        : transaction
    );
    setTransactionList(updatedTransactions);
    console.log(`❌ Declined transaction: ID=${transactionId}`);
  };

  return (
    <div>
      <h3>Transaction History</h3>
      <ul className={styles.list}>
        {transactionList
          .filter((transaction) => transaction && transaction.amount !== undefined)
          .map((transaction, index) => (
            <Transaction
              key={index}
              transaction={transaction}
              onApproveTransaction={handleApproveTransaction}
              onDeclineTransaction={handleDeclineTransaction}
              isAdmin={isAdmin} // Ensure only admin can see buttons
            />
          ))}
      </ul>
    </div>
  );
}

export default TransactionsList;
