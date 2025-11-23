import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { App as CapacitorApp } from "@capacitor/app";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { router } from "./router.tsx";
import { loadStoredState } from "./store/store";

void CapacitorApp.addListener("backButton", ({ canGoBack }) => {
  if (!canGoBack) {
    void CapacitorApp.exitApp();
  } else {
    router.history.back();
  }
});

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

await loadStoredState();
root.render(
  <StrictMode>
    <App />
    <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
  </StrictMode>,
);
