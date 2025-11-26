import { createAppSelector } from "../store/store";
import type { Camera, CameraId } from "../types.ts";

export const selectCameraById = createAppSelector(
  [(state) => state.camera.cameras, (_state, cameraId: CameraId) => cameraId],
  (cameras, cameraId): Camera | undefined => {
    return cameras.find((camera) => camera.id === cameraId);
  },
);
