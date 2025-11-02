import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../../../components/PageWrapper";
import { NewRollPage } from "../../../../pages/NewRollPage";

export const Route = createFileRoute("/camera/$cameraId/roll/new")({
  component: () => (
    <PageWrapper>
      <NewRollPage />
    </PageWrapper>
  ),
});
