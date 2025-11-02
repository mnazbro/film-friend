import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { SettingsPage } from "../pages/SettingsPage";

const Settings = () => (
  <PageWrapper>
    <SettingsPage />
  </PageWrapper>
);

export const Route = createFileRoute("/settings")({
  component: Settings,
});
