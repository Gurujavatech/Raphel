import React, { useState } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setInputValue("");
      return;
    }
    value = Math.min(100, Math.max(0, Number(value))); 
    setInputValue(value);
    setProgress(value);
  };

  const handleButtonClick = (value) => {
    console.log("Setting Progress to:", value); 
    setProgress(value);
    setInputValue(value);
  };

  return (
    <div>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
       
      </div>

      <div className={styles.buttons}>
      <label>Manage Trading in progress</label>
        {[0, 25, 50, 75, 100].map((value) => (
            
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}%
          </button>
        ))}
      </div>

      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter %"
        className={styles.inputField}
      />
    </div>
  );
};

export default ProgressBar;
