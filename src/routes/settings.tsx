import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { SettingsPage } from "../pages/SettingsPage";
import type { ReactNode } from "react";

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
