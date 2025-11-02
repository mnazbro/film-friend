import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { CamerasPage } from "../../pages/CamerasPage";

export const Route = createFileRoute("/camera/")({
  component: () => (
    <PageWrapper>
      <CamerasPage />
    </PageWrapper>
  ),
});
