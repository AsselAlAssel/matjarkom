import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: "John Doe",
    email: "jon@gmail.com",
  },
  token: null,
  type: "marchant",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
});

export default authSlice.reducer;
