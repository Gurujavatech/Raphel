import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 

import { useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Utilities/AuthContext";

const Login = () => {
  const {user, loginUser} = useAuth()
  const navigate = useNavigate()

  const loginForm = useRef(null)

  useEffect(() => {
    if(user){
      toast.success("Logged in successfully")
      navigate('/dashboard')
    }
  },[user, navigate])

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginForm.current) {
        toast.error("Form reference not available.");
        return;
    }

    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    loginUser(userInfo);
};



  return (
    <div className={styles.container}>
      <div className={styles.loginRegisterContainer}>
        <h2>Login</h2>
        <form ref = {loginForm} onSubmit={handleSubmit}>
          <div className={styles.formFieldWrapper}>
            <label>Email:</label>
            <input required type="email" name="email" placeholder="Enter email..." />
          </div>

          <div className={styles.formFieldWrapper}>
            <label>Password:</label>
            <input type="password" name="password" placeholder="Enter password..." autoComplete="current-password" />
          </div>

          <div className={styles.formFieldWrapper}>
            <input type="submit" value="Login" className={styles.btn} />
          </div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;