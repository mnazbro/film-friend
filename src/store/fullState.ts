import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";
import type { StorageService } from "../services/storage";
import { activeStateSchema } from "./activeSlice";
import { appStateSchema } from "./appSlice";
import { cameraStateSchema } from "./cameraSlice";
import type { AppStore } from "./store";

export const fullStateSchema = z.object({
  app: appStateSchema,
  active: activeStateSchema,
  camera: cameraStateSchema,
});
export type FullState = z.infer<typeof fullStateSchema>;

export const loadFullState = createAction<FullState>("@film-friend/set-everything");

export const saveStoredState = (store: AppStore, storageService: StorageService) => {
  const state = store.getState();
  void storageService.saveState("film-friend/state", JSON.stringify(state));
};

export const loadStoredState = async (store: AppStore, storageService: StorageService) => {
  const existingStateString = await storageService.loadState("film-friend/state");
  if (existingStateString === undefined) {
    return;
  }
  const state = JSON.parse(existingStateString) as unknown;
  const { success, data } = fullStateSchema.safeParse(state);
  if (success) {
    store.dispatch(loadFullState(data));
  }
};
