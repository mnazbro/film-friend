import { createAppSelector } from "../store/store";

export const selectActiveCamera = createAppSelector(
  [(state) => state.active.cameraId, (state) => state.camera.cameras],
  (cameraId, cameras) => {
    return cameraId != null
      ? cameras.find((camera) => camera.id === cameraId)
      : undefined;
  },
);
