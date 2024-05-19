import { createAppSelector } from "../store/store";
import { selectActiveCamera } from "./selectActiveCamera";

export const selectActiveRoll = createAppSelector(
  [selectActiveCamera, (state) => state.active.rollId],
  (camera, rollId) => {
    return camera?.rolls.find((roll) => roll.id === rollId);
  },
);
