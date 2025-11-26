import { z } from "zod";

export const cameraIdSchema = z.templateLiteral(["camera_", z.string().min(1)]);
export type CameraId = z.infer<typeof cameraIdSchema>;
export const rollIdSchema = z.templateLiteral(["roll_", z.string().min(1)]);
export type RollId = z.infer<typeof rollIdSchema>;

export const filmFormatSchema = z.enum(["35mm", "120", "polaroid"]);
export type FilmFormat = z.infer<typeof filmFormatSchema>;
export const isoSchema = z.enum(["25", "50", "80", "100", "160", "200", "400", "800", "1600", "3200", "6400"]);
export type Iso = z.infer<typeof isoSchema>;

export const frameSchema = z.object({
  description: z.string(),
  aperture: z.number().nonnegative().optional(),
  shutterSpeed: z.number().nonnegative().optional(),
  location: z.string().optional(), // Use GPS data
  date: z.iso.datetime().optional(),
  link: z.string().optional(),
  notes: z.string().optional(),
});
export type Frame = z.infer<typeof frameSchema>;

export const rollSchema = z.object({
  id: rollIdSchema,
  name: z.string().min(1, "Name must not be empty"),
  iso: isoSchema,
  numberOfFrames: z.number().positive(),
  description: z.string(),
  format: filmFormatSchema,
  loadDate: z.iso.date().optional(),
  shotAtIso: isoSchema.optional(),
  notes: z.string(),
  frames: z.array(frameSchema),
  visible: z.boolean(),
});
export type Roll = z.infer<typeof rollSchema>;

export const cameraSchema = z.object({
  id: cameraIdSchema,
  name: z.string().min(1, "Name must not be empty"),
  description: z.string().optional(),
  filmFormat: filmFormatSchema,
  shutterSpeeds: z.array(z.string()),
  hasLightMeter: z.boolean(),
  notes: z.string().optional(),
  rolls: z.array(rollSchema),
  visible: z.boolean(),
});
export type Camera = z.infer<typeof cameraSchema>;
