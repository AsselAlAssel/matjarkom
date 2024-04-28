import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    email: "",
    token: "",
    isMerchant: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { saveUserData, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.user.token;
export const selectIsMerchant = (state) => state.auth.user.isMerchant;
export const selectEmail = (state) => state.auth.user.email;

export default authSlice.reducer;
