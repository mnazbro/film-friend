/// <reference types="vitest/config" />
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { devtools } from "@tanstack/devtools-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    devtools({
      removeDevtoolsOnBuild: false,
    }),
    react(),
    legacy(),
  ],
  test: {
    globals: false,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
