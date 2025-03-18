import Transaction from "./Transaction";
import styles from "./TransactionList.module.css";

function TransactionsList({ transactions = [] }) {
  return (
    <div>
      <h3>Transaction History</h3>
      <ul className={styles.list}>
        {transactions
          .filter((transaction) => transaction && transaction.amount !== undefined) 
          .map((transaction, index) => (
            <Transaction key={index} transaction={transaction} /> 
          ))}
      </ul>
    </div>
  );
}

export default TransactionsList;
