import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;
