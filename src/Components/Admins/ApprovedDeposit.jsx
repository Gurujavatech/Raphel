import React, { useState } from "react";
import { databases } from "../../appwriteConfig";

const ApproveDeposit = ({ transaction, onClose }) => {
  const [approvedAmount, setApprovedAmount] = useState(transaction.amount);

  const handleApprove = async () => {
    try {
     
      await databases.updateDocument(
        "7e5b3c990025f7c6bf72", // Database ID
        "67d0cdf000362577a5ad", // Collection ID
        transaction.$id,
        {
          status: "approved",
          approvedAmount: parseInt(approvedAmount, 10),
        }
      );

      console.log("Deposit approved successfully");

     
      await databases.updateDocument(
        "7e5b3c990025f7c6bf72", 
        "67d0cdf000362577a5ad", 
        transaction.customerId,
        {
          balance: transaction.balance + parseInt(approvedAmount, 10),
        }
      );

      alert("Deposit approved successfully!");
      onClose();
    } catch (error) {
      console.error("Error approving deposit:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Credit User</h2>
      <input
        type="number"
        value={approvedAmount}
        onChange={(e) => setApprovedAmount(e.target.value)}
      />
      <button onClick={handleApprove}>Approve</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ApproveDeposit;
