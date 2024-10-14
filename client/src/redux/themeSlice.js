import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false, // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', state.isDarkMode);
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', state.isDarkMode);
    },
    detectSystemTheme: (state) => {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      state.isDarkMode = prefersDarkMode;
      localStorage.setItem('theme', prefersDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDarkMode);
    },
  },
});

export const { toggleTheme, setTheme, detectSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
