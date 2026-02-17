import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  },
  isLogin: false,
};

// membuat reducer, dan membuat action secara otomatis
const sessionReducer = createSlice({
  name: "session login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user.id = null;
      state.user.name = "";
      state.user.email = "";
      state.user.phone = "";
      state.user.address = "";
      state.user.role = "";
      state.isLogin = false;
    },
  },
});

export const { login, logout } = sessionReducer.actions;
export default sessionReducer.reducer;
