import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { FlashPage } from "../pages/FlashPage";
import type { ReactNode } from "react";

export const Route = createFileRoute("/flash")({
  component: FlashRoute,
});

function FlashRoute(): ReactNode {
  return (
    <PageWrapper>
      <FlashPage />
    </PageWrapper>
  );
}
