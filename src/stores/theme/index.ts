import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  color: string;
  btnColor: string;
  inpColor: string;
}

const initialState: ThemeState = {
  color: '#263e50',
  btnColor: '#33607e',
  inpColor: '#3c5262',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{ color: string; btnColor: string; inpColor: string }>) {
      state.color = action.payload.color;
      state.btnColor = action.payload.btnColor;
      state.inpColor = action.payload.inpColor;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
