export type CameraId = `camera_${string}`;
export type RollId = `roll_${string}`;

export type FilmFormat = "35mm" | "120" | "polaroid";
export type Iso =
  | "25"
  | "50"
  | "80"
  | "100"
  | "160"
  | "200"
  | "400"
  | "800"
  | "1600"
  | "3200"
  | "6400";

export type Camera = {
  id: CameraId;
  name: string;
  description?: string;
  filmFormat: FilmFormat;
  shutterSpeeds: string[];
  hasLightMeter: boolean;
  notes?: string;
  rolls: Roll[];
  visible: boolean;
};

export type Roll = {
  id: RollId;
  name: string;
  iso: Iso;
  numberOfFrames: number;
  description?: string;
  format: FilmFormat;
  loadDate?: string;
  shotAtIso?: string;
  notes?: string;
  frames: RollFrame[];
  visible: boolean;
};

export type RollFrame = {
  description?: string;

  aperture: string;
  shutterSpeed: string;
  location?: string; // Use GPS data
  date?: string;

  link?: string;

  notes?: string;
};
