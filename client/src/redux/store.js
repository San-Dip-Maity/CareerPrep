import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
  },
});

export default store;
