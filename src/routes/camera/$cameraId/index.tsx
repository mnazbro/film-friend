import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../../components/PageWrapper";
import { CameraPage } from "../../../pages/CameraPage";
import type { ReactNode } from "react";
import { cameraIdSchema } from "../../../types.ts";

export const Route = createFileRoute("/camera/$cameraId/")({
  component: CameraRoute,
});

function CameraRoute(): ReactNode {
  const { cameraId } = Route.useParams();
  const validCameraId = cameraIdSchema.parse(cameraId);

  return (
    <PageWrapper>
      <CameraPage cameraId={validCameraId} />
    </PageWrapper>
  );
}
