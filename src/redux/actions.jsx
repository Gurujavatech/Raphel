export const SET_BALANCE = "SET_BALANCE";
export const DEDUCT_BALANCE = "DEDUCT_BALANCE";



export const setBalance = (payload) => ({
    type: "SET_BALANCE",
    payload,
  });
  

export const deductBalance = (transaction) => ({
    type: DEDUCT_BALANCE,
    payload: transaction
});