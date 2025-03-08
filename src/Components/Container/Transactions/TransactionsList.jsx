import React from 'react';
import Transaction from './Transaction';
import styles from './TransactionList.module.css';  

function TransactionsList({ transactions }) {
  return (
    <div>
    <h3>Transaction History</h3>
    <ul className={styles.list}> 
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  </div>
  );
}

export default TransactionsList;
