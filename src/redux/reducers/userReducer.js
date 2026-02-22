import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (state.user.length === 0) {
        state.user = action.payload;
      } else {
        state.user.push(...action.payload)
      }
    },
    deleteUser: (state, action) => {
      state.user.filter((item) => item.id !== action.payload);
    },
    updateUserById: (state, action) => {
      const { id, changes } = action.payload;
      state.user = state.user.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      );
    },
  },
});

export const { addUser, deleteUser, updateUserById } = userReducer.actions;
export default userReducer.reducer;
