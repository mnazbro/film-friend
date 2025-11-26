import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { loadFullState } from "./fullState";

export const appStateSchema = z.object({
  isDarkMode: z.boolean(),
});
export type AppState = z.infer<typeof appStateSchema>;

const initialState: AppState = {
  isDarkMode: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFullState, (_, { payload }) => {
      return payload.app;
    });
  },
});

export const { setDarkMode } = appSlice.actions;
export const appReducer = appSlice.reducer;
