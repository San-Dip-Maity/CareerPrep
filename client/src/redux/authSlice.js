import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_API_END_POINT } from "../utils/constUtils";


const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    signupRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },

    signupFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const signup = (data) => async (dispatch) => {
  dispatch(authSlice.actions.signupRequest());
  try {
    const response = await axios.post(
      `${AUTH_API_END_POINT}signup`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(authSlice.actions.signupSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(authSlice.actions.signupFailed(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${AUTH_API_END_POINT}login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(authSlice.actions.loginSuccess(response.data));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(authSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      `${AUTH_API_END_POINT}getuser`,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    dispatch(authSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(authSlice.actions.fetchUserFailed(error.response.data.message));
  }
};
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${AUTH_API_END_POINT}logout`,
      {
        withCredentials: true,
      }
    );
    dispatch(authSlice.actions.logoutSuccess());
    dispatch(authSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(authSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(authSlice.actions.clearAllErrors());
};

export default authSlice.reducer;