import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { FlashPage } from "../pages/FlashPage";

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
