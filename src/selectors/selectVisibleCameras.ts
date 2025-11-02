import { createAppSelector } from "../store/store";
import type { Camera } from "../types.ts";

export const selectVisibleCameras = createAppSelector(
  [(state) => state.camera.cameras],
  (cameras): Camera[] => {
    return cameras.filter((camera) => camera.visible);
  },
);
