import { PageWrapper } from "./components/PageWrapper";
import { createBrowserRouter } from "react-router-dom";
import { FlashPage } from "./pages/FlashPage";
import { CamerasPage } from "./pages/CamerasPage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { CameraPage } from "./pages/CameraPage";
import { NewCameraPage } from "./pages/NewCameraPage";
import { NonIdealState } from "./components/NonIdealState";
import { SelectCameraPage } from "./pages/SelectCameraPage";
import { NewRollPage } from "./pages/NewRollPage";
import { RollPage } from "./pages/RollPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper hasBack={false}>
        <HomePage />
      </PageWrapper>
    ),
  },
  {
    path: "/flash",
    element: (
      <PageWrapper>
        <FlashPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera",
    element: (
      <PageWrapper>
        <CamerasPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera/select",
    element: (
      <PageWrapper>
        <SelectCameraPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera/new",
    element: (
      <PageWrapper>
        <NewCameraPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera/:cameraId",
    element: (
      <PageWrapper>
        <CameraPage />
      </PageWrapper>
    ),
  },
  {
    path: "/camera/:cameraId/roll/new",
    element: (
      <PageWrapper>
        <NewRollPage />
      </PageWrapper>
    ),
  },

  {
    path: "/camera/:cameraId/roll/:rollId",
    element: (
      <PageWrapper>
        <RollPage />
      </PageWrapper>
    ),
  },
  {
    path: "/settings",
    element: (
      <PageWrapper>
        <SettingsPage />
      </PageWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <PageWrapper>
        <NonIdealState title="Something went wrong." />
      </PageWrapper>
    ),
  },
]);
