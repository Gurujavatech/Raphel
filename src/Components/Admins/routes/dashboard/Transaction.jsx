// Transaction.jsx
import React from "react";

const Transaction = ({ transaction, onApproveTransaction }) => {
  return (
    <div className="transaction">
      <h3>{transaction.description}</h3>
      <p>Status: {transaction.status}</p>
      <button onClick={() => onApproveTransaction(transaction.$id)}>
        Approve Transaction
      </button>
    </div>
  );
};

export default Transaction;
