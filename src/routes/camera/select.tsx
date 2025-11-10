import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { SelectCameraPage } from "../../pages/SelectCameraPage";

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
