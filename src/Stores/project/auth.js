import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    email: "",
    token: "",
    type: "user",
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

export default authSlice.reducer;
