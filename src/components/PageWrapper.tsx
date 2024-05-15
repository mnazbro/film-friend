import { type FC, ReactNode } from "react";
import { Container } from "@mui/material";
import { Navigation } from "./Navigation";
import { AppBorder } from "./AppBorder";

export type PageProps = {
  children: ReactNode;
};

export const PageWrapper: FC<PageProps> = ({ children }) => {
  return (
    <AppBorder>
      <Container>
        <Navigation />
        {children}
      </Container>
    </AppBorder>
  );
};
