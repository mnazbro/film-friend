import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Camera, CameraId, Roll } from "../types";

export interface CameraState {
  cameras: Camera[];
}

const initialState: CameraState = {
  cameras: [
    {
      id: "camera_1234",
      name: "Canon AE-1",
      filmFormat: "35mm",
      shutterSpeeds: [
        "1000",
        "500",
        "250",
        "125",
        "60",
        "30",
        "15",
        "8",
        "4",
        "2",
        "1s",
        "2s",
        "bulb",
      ],
      hasLightMeter: true,
      rolls: [
        {
          id: "roll_1234",
          name: "My first roll",
          format: "35mm",
          iso: "100",
          numberOfFrames: 36,
          frames: [
            {
              aperture: "16",
              date: "2020-01-01T00:00:00Z",
              shutterSpeed: "100",
            },
            {
              aperture: "8",
              date: "2020-01-01T00:00:00Z",
              shutterSpeed: "200",
            },
          ],
          visible: true,
        },
        {
          id: "roll_2345",
          name: "My second roll",
          format: "35mm",
          iso: "100",
          numberOfFrames: 36,
          frames: [
            {
              aperture: "16",
              date: "2020-01-01T00:00:00Z",
              shutterSpeed: "100",
            },
          ],
          visible: true,
        },
        {
          id: "roll_8367",
          name: "My hidden roll",
          format: "35mm",
          iso: "100",
          numberOfFrames: 36,
          frames: [
            {
              aperture: "16",
              date: "2020-01-01T00:00:00Z",
              shutterSpeed: "100",
            },
          ],
          visible: false,
        },
      ],
      visible: true,
    },
  ],
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    addCamera(
      state,
      { payload: { camera } }: PayloadAction<{ camera: Camera }>,
    ) {
      state.cameras.push(camera);
    },
    addRoll(
      state,
      {
        payload: { cameraId, roll },
      }: PayloadAction<{ cameraId: CameraId; roll: Roll }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      camera?.rolls.push(roll);
    },
  },
});

export const { addCamera, addRoll } = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
