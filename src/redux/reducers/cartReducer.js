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
    removeCart: (state, action) => { // payloadnya berupa array
      state.carts = (state.carts || []).filter((item) => !(item.id === action.payload.id && item.size === action.payload.size && item.variant === action.payload.variant));
    },
    updateCart: (state, action) => {
      state.carts = action.payload
    },
    resetCart: (state, action) => {
      state.carts = (state.carts || []).filter(item => !(item.UID === action.payload))
    }
  },
});

export const { addCart, removeCart, updateCart, resetCart } = cartReducer.actions;
export default cartReducer.reducer;
