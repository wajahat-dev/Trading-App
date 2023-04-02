import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalamount: 0,
  profit: 0,
  investment: 0,
  isRefreshUserDetails: false,
};

const counterSlice = createSlice({
  name: 'TradingReducer',
  initialState,
  reducers: {
    setData: (state,action) => {
      state[action.payload.key] = action.payload.value;
    },
  
  },
});

export const { setData } = counterSlice.actions;
export default counterSlice.reducer;