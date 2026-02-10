import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCart, removeCart } = cartReducer.actions;
export default cartReducer.reducer;
