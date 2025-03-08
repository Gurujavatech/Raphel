import React from "react";
import { IoCard } from "react-icons/io5";
import { SiSolana } from "react-icons/si";

function Cards() {
  return (
    <div className="card">
      <h3>Lets get Started!</h3>
      <div className="card-content">
        <h5>BUY CRYPTO</h5>
        <a href="https://www.bitpay.com/buy-crypto">
          <p>
            Buy your first crypto with a debit or credit card{" "}
            <span className="customIcon">
            <IoCard size={35} />
            </span>
          </p>
        </a>
      </div>
      <div className="card-content">
        <h5>TRANSFER CRYPTO</h5>
        <a href="https://support.trustwallet.com/en/support/solutions/articles/67000731264-how-to-deposit-crypto-into-trust-wallet">
          <p>
            Deposit crypto from another wallet or exchange.{" "}
            <span className="customIcon">
            <SiSolana size={35}/>
            </span>
          </p>
        </a>
      </div>
    </div>
  );
}

export default Cards;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     