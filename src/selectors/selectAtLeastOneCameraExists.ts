import { createAppSelector } from "../store/store";

export const selectAtLeastOneCameraExists = createAppSelector(
  [(state) => state.camera.cameras],
  (cameras) => {
    return cameras.length > 0;
  },
);
