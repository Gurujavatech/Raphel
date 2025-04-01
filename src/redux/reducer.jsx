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

      return {
        ...state,
        transactions: [
          {
            amount: -Math.abs(Number(action.payload.amount)), // Ensure deduction is negative
            wallet: action.payload.wallet, // Store wallet ID
            chain: action.payload.chain, // Store blockchain used
            timestamp: new Date().toISOString(), // Add timestamp for tracking
          },
          ...state.transactions,
        ],
      };

    default:
      return state;
  }
};

export default cryptoReducer;
