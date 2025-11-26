import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { App as CapacitorApp } from "@capacitor/app";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { throttle } from "lodash-es";
import App from "./App";
import { router } from "./router.tsx";
import { loadStoredState, saveStoredState } from "./store/fullState.ts";
import { createAppStore } from "./store/store.ts";
import { CapacitorStorageService } from "./services/storage.ts";

void CapacitorApp.addListener("backButton", ({ canGoBack }) => {
  if (!canGoBack) {
    void CapacitorApp.exitApp();
  } else {
    router.history.back();
  }
});
export const storageService = new CapacitorStorageService();
const store = createAppStore();
store.subscribe(
  throttle(() => {
    saveStoredState(store, storageService);
  }, 1000),
);

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

void loadStoredState(store, storageService).then(() => {
  root.render(
    <StrictMode>
      <App store={store} />
      <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
    </StrictMode>,
  );
  return;
});
