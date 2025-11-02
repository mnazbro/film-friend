import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { HomePage } from "../pages/HomePage";

const Index = () => (
  <PageWrapper hasBack={false}>
    <HomePage />
  </PageWrapper>
);

export const Route = createFileRoute("/")({
  component: Index,
});
