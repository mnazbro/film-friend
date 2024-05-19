import { configureStore, createSelector } from "@reduxjs/toolkit";
import { activeReducer } from "./activeSlice";
import { appReducer } from "./appSlice";
import { cameraReducer } from "./cameraSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    active: activeReducer,
    camera: cameraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();
