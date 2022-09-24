import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    email: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;

      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },

    setOtp: (state, action) => {
      // state represent the initial State
      const { phone, email, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.email = email;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
