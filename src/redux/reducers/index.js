import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./sessionReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

// gabungka reducer
const reducer = combineReducers({
  // diisi reducer yang ada
  session: sessionReducer, //"session" dipakai di useSelector (saat akan digunakan)
  user: userReducer,
  cart: cartReducer,
});

export default reducer;
