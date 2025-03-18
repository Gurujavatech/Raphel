import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { account, databases } from "../appwriteConfig";

const DATABASE_ID = "7e5b3c990025f7c6bf72"; 
const COLLECTION_ID = "67d0cdf000362577a5ad"; 

const AdminRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(null); 

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        
        const user = await account.get();
        const userId = user.$id;

        
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

        
        const adminExists = response.documents.some(doc => doc.userId === userId);

        setIsAdmin(adminExists); 
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false); 
      }
    }

    checkAdminStatus();
  }, []);

  
  if (isAdmin === null) {
    return <p>Loading...</p>;
  }

  
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoutes;
