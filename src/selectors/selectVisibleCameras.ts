import { createAppSelector } from "../store/store";

export const selectVisibleCameras = createAppSelector(
  [(state) => state.camera.cameras],
  (cameras) => {
    return cameras.filter((camera) => camera.visible);
  },
);
