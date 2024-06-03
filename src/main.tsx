import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { App as CapacitorApp } from "@capacitor/app";

void CapacitorApp.addListener("backButton", async ({ canGoBack }) => {
  if (!canGoBack) {
    await CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
