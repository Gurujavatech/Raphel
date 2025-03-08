import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/Container/MainLayout"; // Home Page
import Main from "./Components/Container/Main"; // Dashboard
import PrivateRoutes from "./Utilities/PrivateRoutes";
import { AuthProvider } from "./Utilities/AuthContext";
import Login from "./Logs/Login";
import Register from "./Logs/Register";
import Deposit from "./Components/Deposit/Deposit";

const router = createBrowserRouter([
  { path: "/", element: <MainLayout /> }, // Home Page
  { path: "/login", element: <Login /> }, // Login Page
  { path: "/register", element: <Register /> }, // Register Page
  {
    path: "/dashboard",
    element: <PrivateRoutes />, // Protect Dashboard Route
    children: [{ index: true, element: <Main /> }], // Ensure nested route works
  },
  { path: "/deposit", element: <Deposit /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
