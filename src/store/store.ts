import { configureStore, createSelector } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import { storageService } from "../services/storage";
import { activeReducer } from "./activeSlice";
import { appReducer } from "./appSlice";
import { cameraReducer, setCameraState } from "./cameraSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    active: activeReducer,
    camera: cameraReducer,
  },
});

store.subscribe(
  throttle(() => {
    const state = store.getState();
    void storageService.saveState("camera", state.camera);
  }, 1000),
);

export const loadStoredState = async () => {
  const cameraState = await storageService.loadState("camera");
  if (cameraState) {
    store.dispatch(setCameraState(cameraState));
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();
