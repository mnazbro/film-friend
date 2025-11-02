import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../../components/PageWrapper";
import { CameraPage } from "../../../pages/CameraPage";

export const Route = createFileRoute("/camera/$cameraId/")({
  component: () => (
    <PageWrapper>
      <CameraPage />
    </PageWrapper>
  ),
});
