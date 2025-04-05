import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  
  const isAdmin = user && user.email === "donjispy@gmail.com"; 

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoutes;
