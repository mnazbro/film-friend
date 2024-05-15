import { createSlice } from '@reduxjs/toolkit'

type Camera = {
  name: string;
  description?: string;
  filmSize: string;
  shutterSpeeds: string[];
  hasLightMeter: boolean;
  image?: string;
  notes?: string;
}

export interface CamerasState {
  cameras: Camera[];
}

const initialState: CamerasState = {
  cameras: [{
    name: "Canon AE-1",
    filmSize: "35mm",
    shutterSpeeds: ["1000", "500", "250", "125", "60", "30", "15", "8", "4", "2", "1s", "2s", "bulb"],
    hasLightMeter: true,
  }],
}

export const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {  } = camerasSlice.actions
export default camerasSlice.reducer