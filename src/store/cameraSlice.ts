import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
import { cameraSchema, type Camera, type CameraId, type Frame, type Roll, type RollId } from "../types";
import { loadFullState } from "./fullState";

export const cameraStateSchema = z.object({
  cameras: z.array(cameraSchema),
});

export type CameraState = z.infer<typeof cameraStateSchema>;

const initialState: CameraState = { cameras: [] };

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    addCamera(state, { payload: { camera } }: PayloadAction<{ camera: Camera }>) {
      state.cameras.push(camera);
    },
    updateCamera(
      state,
      { payload: { cameraId, updates } }: PayloadAction<{ cameraId: CameraId; updates: Partial<Omit<Camera, "id">> }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      Object.assign(camera, updates);
    },
    deleteCamera(state, { payload: { cameraId } }: PayloadAction<{ cameraId: CameraId }>) {
      const index = state.cameras.findIndex((camera) => camera.id === cameraId);
      if (index === -1) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      state.cameras.splice(index, 1);
    },
    hideCameraCamera(state, { payload: { cameraId } }: PayloadAction<{ cameraId: CameraId }>) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      camera.visible = false;
    },
    addRoll(state, { payload: { cameraId, roll } }: PayloadAction<{ cameraId: CameraId; roll: Roll }>) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      camera.rolls.push(roll);
    },
    updateRoll(
      state,
      {
        payload: { cameraId, rollId, updates },
      }: PayloadAction<{ cameraId: CameraId; rollId: RollId; updates: Partial<Omit<Roll, "id">> }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const roll = camera.rolls.find((roll) => roll.id === rollId);
      if (!roll) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      Object.assign(roll, updates);
    },
    deleteRoll(state, { payload: { cameraId, rollId } }: PayloadAction<{ cameraId: CameraId; rollId: RollId }>) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const index = camera.rolls.findIndex((roll) => roll.id === rollId);
      if (index === -1) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      camera.rolls.splice(index, 1);
    },
    hideRoll(state, { payload: { cameraId, rollId } }: PayloadAction<{ cameraId: CameraId; rollId: RollId }>) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const roll = camera.rolls.find((roll) => roll.id === rollId);
      if (!roll) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      roll.visible = false;
    },
    addFrame(
      state,
      { payload: { cameraId, rollId, frame } }: PayloadAction<{ cameraId: CameraId; rollId: RollId; frame: Frame }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const roll = camera.rolls.find((roll) => roll.id === rollId);
      if (!roll) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      roll.frames.push(frame);
    },
    updateFrame(
      state,
      {
        payload: { cameraId, rollId, frameIndex, updates },
      }: PayloadAction<{ cameraId: CameraId; rollId: RollId; frameIndex: number; updates: Partial<Frame> }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const roll = camera.rolls.find((roll) => roll.id === rollId);
      if (!roll) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      if (frameIndex < 0 || frameIndex >= roll.frames.length) {
        throw new Error(`Frame at index ${frameIndex.toString()} not found`);
      }
      const frame = roll.frames[frameIndex];
      Object.assign(frame, updates);
    },
    deleteFrame(
      state,
      {
        payload: { cameraId, rollId, frameIndex },
      }: PayloadAction<{ cameraId: CameraId; rollId: RollId; frameIndex: number }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      if (!camera) {
        throw new Error(`Camera with id ${cameraId} not found`);
      }
      const roll = camera.rolls.find((roll) => roll.id === rollId);
      if (!roll) {
        throw new Error(`Roll with id ${rollId} not found`);
      }
      if (frameIndex < 0 || frameIndex >= roll.frames.length) {
        throw new Error(`Frame at index ${frameIndex.toString()} not found`);
      }
      roll.frames.splice(frameIndex, 1);
    },
    setCameraState(state, { payload }: PayloadAction<CameraState>) {
      state.cameras = payload.cameras;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFullState, (_, { payload }) => {
      return payload.camera;
    });
  },
});

export const {
  addCamera,
  updateCamera,
  deleteCamera,
  hideCameraCamera,
  addRoll,
  updateRoll,
  deleteRoll,
  hideRoll,
  addFrame,
  updateFrame,
  deleteFrame,
  setCameraState,
} = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
