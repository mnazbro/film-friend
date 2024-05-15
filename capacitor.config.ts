import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mnazbro.photo.tool",
  appName: "photo-tool",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
