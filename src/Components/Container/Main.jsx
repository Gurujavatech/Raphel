import React, { Component } from "react";
import { connect } from "react-redux";
import Balance from "./Transactions/Balance";
import ReceiveIcon from "./Transactions/ReceiveIcon";
import CryptoPrices from "./Transactions/CryptoPrices";
import Cards from "./Transactions/Cards";
import { setBalance, deductBalance } from "../../redux/actions";
import styles from "./Main.module.css";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../../Utilities/AuthContext";
import BottomNav from "../BottomNav";

function MainWrapper(props) {
  const { user } = useAuth();
  return <Main {...props} user={user} />;
}

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: localStorage.getItem("darkMode") === "true",
    };
  }

    
  

  render() {
    const { transactions, setBalance, deductBalance, user } = this.props;

    return (
      <div className={styles.mainWrapper}>
        <NavBar />
        <div className={styles.contentContainer}>

          <div className={styles.container}>
            <Balance user={user} transactions={transactions} /> 
            <ReceiveIcon setBalance={setBalance} deductBalance={deductBalance} transactions={transactions} />
            <Cards />
            <CryptoPrices />
            <BottomNav />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions || [],
});

const mapDispatchToProps = (dispatch) => ({
  setBalance: (transaction) => dispatch(setBalance(transaction)),
  deductBalance: (transaction) => dispatch(deductBalance(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);