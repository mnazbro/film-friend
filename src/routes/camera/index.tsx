import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { CamerasPage } from "../../pages/CamerasPage";

export const Route = createFileRoute("/camera/")({
  component: CamerasRoute,
});

function CamerasRoute(): ReactNode {
  return (
    <PageWrapper>
      <CamerasPage />
    </PageWrapper>
  );
}
