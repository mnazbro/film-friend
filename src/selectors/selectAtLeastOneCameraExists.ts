import { createAppSelector } from "../store/store";

export const selectAtLeastOneCameraExists = createAppSelector([(state) => state.camera.cameras], (cameras): boolean => {
  return cameras.length > 0;
});
