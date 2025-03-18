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
      if (!action.payload || isNaN(action.payload.amount)) {
        console.error("Invalid deduction payload:", action.payload);
        return state;
      }

      const deductionAmount = Number(action.payload.amount);

      return {
        ...state,
        transactions: [
          { amount: -Math.abs(deductionAmount) }, 
          ...state.transactions,
        ],
      };

    default:
      return state;
  }
};
  

export default cryptoReducer;