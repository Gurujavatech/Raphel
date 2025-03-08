import { useState, createContext, useContext, useEffect } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(userInfo.email, userInfo.password); 
      const accountDetails = await account.get();
      setUser(accountDetails);
      console.log("Login successful!");
    } catch (error) {
      console.error("Login Failed", error);
    }
    setLoading(false);
  };
  

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
      console.log("Registration Successful");
    } catch (error) {
      
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
  setLoading(true);
  try {
    const accountDetails = await account.get(); 
    setUser(accountDetails);
  } catch (error) {
    console.error("Error checking user status:", error);
    setUser(null); 
  } finally {
    setLoading(false);
  }
};
  
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
