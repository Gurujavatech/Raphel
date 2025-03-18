import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite"; 
import styles from "./CustomerList.module.css";


const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('67c75cc7000c546a2491'); 

const database = new Databases(client);

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        
        const response = await database.listDocuments('usersCollectionId');
        console.log("Fetched customers:", response); 

        
        if (response && response.documents) {
          const customersData = response.documents.map((customer) => ({
            username: customer.username,
            balance: customer.balance,
            $id: customer.$id, 
          }));
          setCustomers(customersData); 
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCustomers();
  }, []); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className={styles.customerList}>
      <h3>Customer Management</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.$id}>
                <td>{customer.username}</td>
                <td>${customer.balance}</td>
                <td>
                  
                  <button className={styles.manageBtn}>
                    Manage
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
