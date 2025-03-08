import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Background from "../Background/Background";
import images from "../../assets/phantom.png";
import Nfts from "../../assets/NFT.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/AuthContext"; 

function Hero() {
  const { user } = useAuth(); 
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <section className={styles.hero}>
      <Background />
      <div className={styles.content}>
        <p className={styles.subtitle}>The crypto wallet that will take you places</p>
        <h1 className={styles.title}>
          Your <img src={images} alt="Web3" /> web3 companion
        </h1>

        {!user && ( 
          <button className={styles.btn} onClick={handleGetStarted}>
            Get Started
          </button>
        )}

        <img
          src={Nfts}
          alt="NFT Ads"
          className={`${styles.floatingImg} ${scrolling ? styles.scrollUp : ""}`}
        />
      </div>
    </section>
  );
}

export default Hero;
