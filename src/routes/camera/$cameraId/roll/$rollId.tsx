import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../../../components/PageWrapper";
import { RollPage } from "../../../../pages/RollPage";

export const Route = createFileRoute("/camera/$cameraId/roll/$rollId")({
  component: () => (
    <PageWrapper>
      <RollPage />
    </PageWrapper>
  ),
});
