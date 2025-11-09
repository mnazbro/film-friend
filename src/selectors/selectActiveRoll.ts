import { createAppSelector } from "../store/store";
import { selectActiveCamera } from "./selectActiveCamera";
import type { Roll } from "../types.ts";

export const selectActiveRoll = createAppSelector(
  [selectActiveCamera, (state) => state.active.rollId],
  (camera, rollId): Roll | undefined => {
    return camera?.rolls.find((roll) => roll.id === rollId);
  },
);
