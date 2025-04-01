import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { account, databases } from "../appwriteConfig";
import { Query } from "appwrite"; 

const DATABASE_ID = "your_database_id"; 
const COLLECTION_ID = "your_users_collection_id"; 

const AdminRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const user = await account.get();  
        const userId = user.$id;

        // Fetch user data from Appwrite’s "users" collection
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userId", userId),
        ]);

        if (response.documents.length > 0) {
          const userData = response.documents[0];
          setIsAdmin(userData.isAdmin); // Ensure `isAdmin` is a boolean in Appwrite
        } else {
          setIsAdmin(false);
        }
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

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoutes;
