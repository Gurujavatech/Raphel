import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Import fixed
import MainLayout from "./Components/Container/MainLayout"; // Home Page
import Main from "./Components/Container/Main"; // User Dashboard
import PrivateRoutes from "./Utilities/PrivateRoutes"; // Protect User Routes
import AdminRoutes from "./Utilities/AdminRoutes"; // Protect Admin Routes
import { AuthProvider } from "./Utilities/AuthContext"; // Authentication Context
import Login from "./Logs/Login";
import Register from "./Logs/Register";

import SumLayout from "./Components/SumLayout";
import AdminDashBoard from "./Components/Admins/AdminDashBoard";
import Dashboards from "./Components/Admins/Dashboards";
import Dashboard from "./Components/Admins/Dashboard";
import TradePage from "./Components/Container/Transactions/TradePage";
import Swap from "./Components/Container/Transactions/Swap";
import TransactionsList from "./Components/Container/Transactions/TransactionsList";
import BottomNav from "./Components/BottomNav"; 
import Deposit from "./Components/Deposit/Deposit";
import Add from "./Components/Container/Transactions/Add";



const router = createBrowserRouter([
  { path: "/", element: <MainLayout /> }, 
  { path: "/login", element: <Login /> }, 
  { path: "/register", element: <Register /> }, 
  { path: "/deposit", element: <Deposit /> }, 
  { path: "/learn", element: <SumLayout /> }, 
  { path: "/swap", element: <Swap /> }, 
  { path: "/add", element: <Add /> },

  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [{ index: true, element: <Main /> }], 
  },

  {
    path: "/trade",
    element: <PrivateRoutes />,
    children: [{ index: true, element: <TradePage /> }], 
  },

  {
    path: "/admin",
    element: <AdminDashBoard />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/admin/:customerId", element: <Dashboards /> },
    ], 
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={router} /> 
          
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
