import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import camerasSlice from './camerasSlice';

export const store = configureStore({
 reducer: {
    app: appReducer,
    cameras: camerasSlice,
 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;