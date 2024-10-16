import { createSlice } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

const initialState = {
  user: null,
  token: null, // JWT token
};

const authSlice = createSlice({
   name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: async (state) => {
      localStorage.removeItem("user");
      await API.get("/auth/logout");
      window.location.href = "/";
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
