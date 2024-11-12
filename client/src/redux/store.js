import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import jobSlice from './jobSlice';
import companySlice from './companySlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: authReducer,
    job:jobSlice,
    company:companySlice,
  },
});

export default store;
