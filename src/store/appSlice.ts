import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setDarkMode } = appSlice.actions;
export const appReducer = appSlice.reducer;
