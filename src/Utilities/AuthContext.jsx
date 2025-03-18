import { useState, useEffect, useContext, createContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";
import { PuffLoader } from "react-spinners"; 
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      console.log("session response:", response);

      let accountDetails = await account.get();
      console.log("account details:", accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.error("Login Failed", error);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    try{
      account.deleteSession("current");
    setUser(null);
    toast.success("Logged out successfully");
  } catch(error){
    console.error("Logout failed:", error);
  }
    }

    const registerUser = async (userInfo) => {
      setLoading(true);
      try {
          await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.name);
          toast.success("Registration Successful");
          console.log("Registration successful");
      } catch (error) {
          toast.error("Registration error: " + error.message);
          console.error("Registration error:", error);
      } finally {
          setLoading(false);
      }
  };
    

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      let session = await account.getSession("current");
      if (session) {
        let accountDetails = await account.get();
        setUser(accountDetails);
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PuffLoader color="#4A90E2" size={100} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;