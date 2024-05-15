import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isDarkMode = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = appSlice.actions
export default appSlice.reducer