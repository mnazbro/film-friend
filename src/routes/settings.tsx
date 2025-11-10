import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { SettingsPage } from "../pages/SettingsPage";

export const Route = createFileRoute("/settings")({
  component: SettingsRoute,
});

function SettingsRoute(): ReactNode {
  return (
    <PageWrapper>
      <SettingsPage />
    </PageWrapper>
  );
}
