import { SET_BALANCE, DEDUCT_BALANCE } from "./actions";

const initialState = {
  transactions: [],
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case DEDUCT_BALANCE:
      const totalBalance = state.transactions.reduce(
        (acc, t) => acc + Number(t.amount),
        0
      );
      const deductionAmount = Number(action.payload.amount);

  console.log("Total Balance Before Deduction:", totalBalance);
  console.log("Deduction Amount:", deductionAmount);

      if (totalBalance >= deductionAmount) {
        return {
          ...state,
          transactions: [
            { amount: -deductionAmount },
            ...state.transactions,
          ],
        };
        
      } else {
        alert("Insufficient funds!");
        return state;
      }

    default:
      return state;
  }
};

export default cryptoReducer;
