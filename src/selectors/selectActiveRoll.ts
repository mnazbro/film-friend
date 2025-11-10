import { createAppSelector } from "../store/store";
import type { Roll } from "../types.ts";
import { selectActiveCamera } from "./selectActiveCamera";

export const selectActiveRoll = createAppSelector(
  [selectActiveCamera, (state) => state.active.rollId],
  (camera, rollId): Roll | undefined => {
    return camera?.rolls.find((roll) => roll.id === rollId);
  },
);
