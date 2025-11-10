import { createAppSelector } from "../store/store";
import type { Camera } from "../types.ts";

export const selectActiveCamera = createAppSelector(
  [(state) => state.active.cameraId, (state) => state.camera.cameras],
  (cameraId, cameras): Camera | undefined => {
    return cameraId != null ? cameras.find((camera) => camera.id === cameraId) : undefined;
  },
);
