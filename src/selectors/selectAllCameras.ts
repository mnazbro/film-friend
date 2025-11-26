import { createAppSelector } from "../store/store";
import type { Camera } from "../types.ts";

export const selectAllCameras = createAppSelector([(state) => state.camera.cameras], (cameras): Camera[] => {
  return cameras;
});
