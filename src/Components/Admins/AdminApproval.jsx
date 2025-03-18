import React, { useEffect, useState } from "react";
import { databases } from "../../appwriteConfig";
import { Query } from 'appwrite'

function AdminApproval() {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const response = await databases.listDocuments(
          '7e5b3c990025f7c6bf72', 
          '67d0cdf000362577a5ad', 
          [Query.equal('status', 'pending')] 
        );
        setPendingTransactions(response.documents);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchPendingTransactions();
  }, []);

  return (
    <div>
      <h3>Pending Transactions</h3>
      <ul>
        {pendingTransactions.map((transaction) => (
          <li key={transaction.$id}>{transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminApproval;