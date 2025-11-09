import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { NewCameraPage } from "../../pages/NewCameraPage";
import type { ReactNode } from "react";

export const Route = createFileRoute("/camera/new")({
  component: NewCameraRoute,
});

function NewCameraRoute(): ReactNode {
  return (
    <PageWrapper>
      <NewCameraPage />
    </PageWrapper>
  );
}
