import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTheme } from '../../hooks/use-theme'

import { overviewData, recentSalesData, topProducts } from "../../constants";

import styles from './Page.module.css'

import { Footer } from "../../layouts/Footer";
import { Client, Databases } from "appwrite";
import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67d5ffab003bd6b6f70e");

const databases = new Databases(client);

const DashboardPage = () => {
    const { theme } = useTheme();
    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data.users); 
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  
    return (
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.grid}>
  
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <Package size={26} />
      </div>
      <p className={styles.cardTitle}>Total Users</p>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.amount}>25,154</p>
      <span className={styles.trend}>
        <TrendingUp size={18} /> 25%
      </span>
    </div>
  </div>

  
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <DollarSign size={26} />
      </div>
      <p className={styles.cardTitle}>Total Deposit</p>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.amount}>$16,000</p>
      <span className={styles.trend}>
        <TrendingUp size={18} /> 12%
      </span>
    </div>
  </div>

  
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <Users size={26} />
      </div>
      <p className={styles.cardTitle}>Total Customers</p>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.amount}>15,400k</p>
      <span className={styles.trend}>
        <TrendingUp size={18} /> 15%
      </span>
    </div>
  </div>

  
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <CreditCard size={26} />
      </div>
      <p className={styles.cardTitle}>Sales</p>
    </div>
    <div className={styles.cardBody}>
      <p className={styles.amount}>12,340</p>
      <span className={styles.trend}>
        <TrendingUp size={18} /> 19%
      </span>
    </div>
  </div>
</div>

  
        
        <div className={styles.chartContainer}>
          <div className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Overview</p>
            </div>
            <div className={styles.chartBody}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip cursor={false} formatter={(value) => `$${value}`} />
                  <XAxis dataKey="name" stroke="#475569" tickMargin={6} />
                  <YAxis dataKey="total" stroke="#475569" tickFormatter={(value) => `$${value}`} tickMargin={6} />
                  <Area type="monotone" dataKey="total" stroke="#2563eb" fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={styles.content}>
      <h2>Registered Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Registered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.$id}>
                <td>{user.$id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{new Date(user.$createdAt).toLocaleString()}</td>
                <td>
                <button
  className={styles.manageButton}
  onClick={() => navigate(`/manage/${user.$id}`, { state: { user } })}
>
  Manage
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
  export default DashboardPage;
  