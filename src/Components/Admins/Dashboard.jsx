import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Client, Databases } from "appwrite";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67c75cc7000c546a2491");
const databases = new Databases(client);

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [subBalance, setSubBalance] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        
        const response = await databases.listDocuments(
          "7e5b3c990025f7c6bf72", 
          "67d3673800374c4fe240" 
        );

        console.log("Fetched documents:", response.documents);

        const deposits = response.documents;

        setTotalCustomers(deposits.length); 
        const balanceSum = deposits.reduce((acc, item) => acc + item.amount, 0);
        setTotalBalance(balanceSum);

        
        const withdrawalsSum = deposits.reduce((acc, item) => acc + item.withdrawalAmount, 0);
        setTotalWithdrawals(withdrawalsSum);

        
        const subBalanceAmount = deposits.reduce((acc, item) => acc + item.subBalance, 0);
        setSubBalance(subBalanceAmount);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Welcome Admin</h2>
      <div className={styles.cards}>
        <div className={styles.card}>📊 All Customers: {totalCustomers}</div>
        <div className={styles.card}>💲 Total Balance: ${totalBalance}</div>
        <div className={styles.card}>📉 Sub Balance: ${subBalance}</div>
        <div className={styles.card}>💸 Total Withdrawals: ${totalWithdrawals}</div>
      </div>
    </div>
  );
};

export default Dashboard;
