export const SET_BALANCE = "SET_BALANCE";
export const DEDUCT_BALANCE = "DEDUCT_BALANCE";



export const setBalance = (transaction) => ({
    type: SET_BALANCE,
    payload: transaction
})

export const deductBalance = (transaction) => ({
    type: DEDUCT_BALANCE,
    payload: transaction
});
