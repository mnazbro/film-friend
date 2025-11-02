import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { SelectCameraPage } from "../../pages/SelectCameraPage";

export const Route = createFileRoute("/camera/select")({
  component: () => (
    <PageWrapper>
      <SelectCameraPage />
    </PageWrapper>
  ),
});
