import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../../components/PageWrapper";
import { CamerasPage } from "../../pages/CamerasPage";
import type { ReactNode } from "react";

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
