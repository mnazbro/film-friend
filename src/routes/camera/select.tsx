import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { SelectCameraPage } from "../../pages/SelectCameraPage";
import type { ReactNode } from "react";

export const Route = createFileRoute("/camera/select")({
  component: SelectCameraRoute,
});

function SelectCameraRoute(): ReactNode {
  return (
    <PageWrapper>
      <SelectCameraPage />
    </PageWrapper>
  );
}
