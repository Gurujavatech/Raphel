import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTheme } from '../../hooks/use-theme'

import { overviewData, recentSalesData, topProducts } from "../../constants";

import styles from './Page.module.css'

import { Footer } from "../../layouts/Footer";

import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();
  
    return (
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.grid}>
  {/* Total Users Card */}
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

  {/* Total Deposit Card */}
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

  {/* Total Customers Card */}
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

  {/* Sales Card */}
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

  
        {/* Overview Chart */}
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
  
        {/* Footer */}
        <Footer />
      </div>
    );
  };
  
  export default DashboardPage;
  