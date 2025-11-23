import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
import type { CameraId, RollId } from "../types";

export const activeStateSchema = z.object({
  cameraId: z.string().nullable(),
  rollId: z.string().nullable(),
});
export type ActiveState = z.infer<typeof activeStateSchema>;

const initialState: ActiveState = {
  cameraId: null,
  rollId: null,
};

const activeSlice = createSlice({
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
