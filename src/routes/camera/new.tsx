import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { NewCameraPage } from "../../pages/NewCameraPage";

export const Route = createFileRoute("/camera/new")({
  component: () => (
    <PageWrapper>
      <NewCameraPage />
    </PageWrapper>
  ),
});
