import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../../../components/PageWrapper";
import { RollPage } from "../../../../pages/RollPage";
import { cameraIdSchema, rollIdSchema } from "../../../../types.ts";
import type { ReactNode } from "react";

export const Route = createFileRoute("/camera/$cameraId/roll/$rollId")({
  component: RollRoute,
});

function RollRoute(): ReactNode {
  const { cameraId, rollId } = Route.useParams();
  const validCameraId = cameraIdSchema.parse(cameraId);
  const validRollId = rollIdSchema.parse(rollId);

  return (
    <PageWrapper>
      <RollPage cameraId={validCameraId} rollId={validRollId} />
    </PageWrapper>
  );
}
