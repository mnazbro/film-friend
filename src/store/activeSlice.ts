import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { CameraId, RollId } from "../types";

export interface ActiveState {
  cameraId: CameraId | null;
  rollId: RollId | null;
}

const initialState: ActiveState = {
  cameraId: null,
  rollId: null,
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setActiveCamera(state, action: PayloadAction<CameraId | null>) {
      state.cameraId = action.payload;
    },
    setActiveRoll(state, action: PayloadAction<RollId | null>) {
      state.rollId = action.payload;
    },
  },
});

export const { setActiveCamera, setActiveRoll } = activeSlice.actions;
export const activeReducer = activeSlice.reducer;
