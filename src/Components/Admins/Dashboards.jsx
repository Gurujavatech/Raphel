import React, { useEffect, useState } from "react";
import styles from "./Dashboards.module.css";
import TransactionsList from "../Container/Transactions/TransactionsList";

function Dashboards() {
  const [balance, setBalance] = useState(0);
  const [receiveRequests, setReceiveRequests] = useState([]);
  const [sendRequests, setSendRequests] = useState([]);
  const [totalSent, setTotalSent] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
    const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    setBalance(storedBalance);
  }, []);

  
  const approveTransaction = (id) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        transaction.status = "successful";  
        
        const newBalance = balance + transaction.amount;
        localStorage.setItem("balance", newBalance);
        setBalance(newBalance);
      }
      return transaction;
    });

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  };

  
  const rejectTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("balance")) || 0;
    const storedReceiveRequests = JSON.parse(localStorage.getItem("receiveRequests")) || [];
    const storedSendRequests = JSON.parse(localStorage.getItem("sendRequests")) || [];

    setBalance(storedBalance);
    setReceiveRequests(storedReceiveRequests);
    setSendRequests(storedSendRequests);

    
    const sentAmount = storedSendRequests.reduce((acc, req) => req.status === "successful" ? acc + req.amount : acc, 0);
    setTotalSent(sentAmount);
  }, []);

 
  const approveReceiveRequest = (id) => {
    const request = receiveRequests.find((req) => req.id === id);
    if (!request) return;

    const updatedBalance = balance + request.amount;
    const updatedRequests = receiveRequests.filter((req) => req.id !== id);

    request.status = "successful"; 

    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("receiveRequests", JSON.stringify(updatedRequests));

    setBalance(updatedBalance);
    setReceiveRequests(updatedRequests);
  };

  
  const declineReceiveRequest = (id) => {
    const updatedRequests = receiveRequests.filter((req) => req.id !== id);
    localStorage.setItem("receiveRequests", JSON.stringify(updatedRequests));
    setReceiveRequests(updatedRequests);
  };

  
  const approveSendRequest = (id) => {
    const request = sendRequests.find((req) => req.id === id);
    if (!request || request.amount > balance) {
      alert("Insufficient balance to approve this request.");
      return;
    }

    const updatedBalance = balance - request.amount;
    const updatedRequests = sendRequests.filter((req) => req.id !== id);

    request.status = "successful"; 

    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("sendRequests", JSON.stringify(updatedRequests));

    
    const newTotalSent = updatedRequests.reduce((acc, req) => req.status === "successful" ? acc + req.amount : acc, 0);
    setTotalSent(newTotalSent);

    setBalance(updatedBalance);
    setSendRequests(updatedRequests);
  };

  
  const declineSendRequest = (id) => {
    const updatedRequests = sendRequests.filter((req) => req.id !== id);
    localStorage.setItem("sendRequests", JSON.stringify(updatedRequests));
    setSendRequests(updatedRequests);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h3 className={styles.dashboardHeader}>Admin controls || User Dashboard</h3>

     
      <h4>Pending Receive Requests</h4>
      {receiveRequests.map((req) => (
        <div key={req.id} className={styles.requestItem}>
          <p>Amount: ${req.amount}</p>
          <p>Status: {req.status || "pending"}</p>
          <button onClick={() => approveReceiveRequest(req.id)} className={styles.approveBtn}>
            Approve
          </button>
          <button onClick={() => declineReceiveRequest(req.id)} className={styles.declineBtn}>
            Decline
          </button>
        </div>
      ))}

      
      <h4>Pending Send Requests</h4>
      {sendRequests.map((req) => (
        <div key={req.id} className={styles.requestItem}>
          <p>Amount: ${req.amount}</p>
          <p>Status: {req.status || "pending"}</p>
          <button onClick={() => approveSendRequest(req.id)} className={styles.approveBtn}>
            Approve
          </button>
          <button onClick={() => declineSendRequest(req.id)} className={styles.declineBtn}>
            Decline
          </button>
        </div>
      ))}

      
      <div>
        <div className={styles.card}>
          <h4>Total Received</h4>
          <p className={styles.balanceValue}>${balance}</p>
        </div>
        <div className={styles.card}>
          <h4>Total Sent</h4>
          <p className={styles.sentValue}>${totalSent}</p>
        </div>
      </div>
      <TransactionsList 
        transactions={transactions} 
        onApprove={approveTransaction} 
        onReject={rejectTransaction} 
      />
    </div>
  );
}

export default Dashboards;
