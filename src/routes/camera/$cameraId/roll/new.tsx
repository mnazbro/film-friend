import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../../../../components/PageWrapper";
import { NewRollPage } from "../../../../pages/NewRollPage";
import { cameraIdSchema } from "../../../../types.ts";

export const Route = createFileRoute("/camera/$cameraId/roll/new")({
  component: NewRollRoute,
});

function NewRollRoute(): ReactNode {
  const { cameraId } = Route.useParams();
  const validCameraId = cameraIdSchema.parse(cameraId);

  return (
    <PageWrapper>
      <NewRollPage cameraId={validCameraId} />
    </PageWrapper>
  );
}
