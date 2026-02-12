import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.carts = state.carts || [];
      state.carts.push(action.payload);
    },
    removeCart: (state, action) => {
      state.carts = (state.carts || []).filter((item) => item.id !== action.payload);
    },
    updateCart: (state, action) => {
      state.carts = action.payload
    }
  },
});

export const { addCart, removeCart, updateCart } = cartReducer.actions;
export default cartReducer.reducer;
