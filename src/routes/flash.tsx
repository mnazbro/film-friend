import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { FlashPage } from "../pages/FlashPage";

const Flash = () => (
  <PageWrapper>
    <FlashPage />
  </PageWrapper>
);

export const Route = createFileRoute("/flash")({
  component: Flash,
});
