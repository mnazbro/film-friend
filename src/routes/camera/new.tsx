import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { NewCameraPage } from "../../pages/NewCameraPage";

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
