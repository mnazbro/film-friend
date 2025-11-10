import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { HomePage } from "../pages/HomePage";

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
