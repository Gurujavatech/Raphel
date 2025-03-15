import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useEffect } from "react"; 
import { useRef } from "react";
import { useAuth } from "../Utilities/AuthContext";



const Register = () => {
  const registerationForm = useRef(null);
    const {user, registerUser } = useAuth()

    const navigate = useNavigate();

     useEffect(() => {
            if(user){
                navigate('/dashboard')
            }
        }, [user, navigate])
    

    const handleSubmit= (e) => {
        e.preventDefault()

        const name = registerationForm.current.name.value
        const email = registerationForm.current.email.value
        const password1 = registerationForm.current.password1.value
        const password2 = registerationForm.current.password2.value

        if(password1 !== password2){
            alert('password do not match')
            return
        }

        const userInfo = { name, email, password: password1 };
        try {
           registerUser(userInfo);
          navigate('/login'); 
        } catch (error) {
          console.error('Registration failed:', error);
        }
        
    }
  return (
    <div className={styles.container}>
      <div className={styles.loginRegisterContainer}>
        <h2>Register</h2>
        <form ref={registerationForm} onSubmit={handleSubmit}>
          <div className={styles.formFieldWrapper}>
            <label>Name:</label>
            <input required type="text" name="name" placeholder="Enter name..." />
          </div>

          <div className={styles.formFieldWrapper}>
            <label>Email:</label>
            <input required type="email" name="email" placeholder="Enter email..." />
          </div>

          <div className={styles.formFieldWrapper}>
            <label>Password:</label>
            <input type="password" name="password1" placeholder="Enter password..." />
          </div>

          <div className={styles.formFieldWrapper}>
            <label>Confirm Password:</label>
            <input type="password" name="password2" placeholder="Confirm password..." />
          </div>

          <div className={styles.formFieldWrapper}>
            <input type="submit" value="Register" className={styles.btn} />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
