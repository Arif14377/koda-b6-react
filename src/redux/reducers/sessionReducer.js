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
  token: null,
};

// membuat reducer, dan membuat action secara otomatis
const sessionReducer = createSlice({
  name: "session login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = {
        id: null,
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "",
      };
      state.token = null;
      state.isLogin = false;
    },
    updateSessionUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateSessionUser } = sessionReducer.actions;
export default sessionReducer.reducer;
