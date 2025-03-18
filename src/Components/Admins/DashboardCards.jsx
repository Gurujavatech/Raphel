
import React, { useEffect, useState } from "react";
import { databases } from "../services/appwriteConfig";
import "./AdminDashboard.css";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalBalance: 0,
    transactions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await databases.listDocuments("your_database_id", "your_collection_id");
        const totalBalance = response.documents.reduce((sum, user) => sum + user.balance, 0);
        setStats({
          totalCustomers: response.total,
          totalBalance,
          transactions: response.total, 
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="card">Customers: {stats.totalCustomers}</div>
      <div className="card">Total Balance: ${stats.totalBalance}</div>
      <div className="card">Transactions: {stats.transactions}</div>
    </div>
  );
};

export default DashboardCards;
