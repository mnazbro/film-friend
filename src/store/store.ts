import { configureStore, createSelector } from "@reduxjs/toolkit";
import { activeReducer } from "./activeSlice";
import { appReducer } from "./appSlice";
import { cameraReducer } from "./cameraSlice";
import type { FullState } from "./fullState";

export const createAppStore = (preloadedState?: FullState) => {
  const store = configureStore({
    reducer: {
      app: appReducer,
      active: activeReducer,
      camera: cameraReducer,
    },
    preloadedState,
  });

  return store;
};

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const createAppSelector = createSelector.withTypes<RootState>();
