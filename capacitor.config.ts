import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'photo.tool',
  appName: 'photo-tool',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
