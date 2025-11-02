import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "../components/PageWrapper";
import { HomePage } from "../pages/HomePage";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: IndexRoute,
});

function IndexRoute(): ReactNode {
  return (
    <PageWrapper hasBack={false}>
      <HomePage />
    </PageWrapper>
  );
}
