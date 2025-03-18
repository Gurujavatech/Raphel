import React from "react";
import { IoCard } from "react-icons/io5";
import { SiSolana } from "react-icons/si";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <div className="card">
      <h3>Lets get Started!</h3>
      <div className="card-content">
        <h5>BUY CRYPTO</h5>
       <Link to = '/trade'>
       <p>
            Buy your first crypto with a debit or credit card{" "}
            <span className="customIcon">
            <IoCard size={35} />
            </span>
          </p>
          </Link> 
      </div>
      <div className="card-content">
  <h5>TRANSFER CRYPTO</h5>
  <Link to="/add">
    <p>
      Deposit crypto from another wallet or exchange.{" "}
      <span className="customIcon">
        <SiSolana size={35} />
      </span>
    </p>
  </Link>
</div>
    </div>
  );
}

export default Cards;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     