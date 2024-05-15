import { useState, type FC, ReactNode } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Navigation } from "./Navigation";
import { AppBorder } from "./AppBorder";

export type PageProps = {
  children: ReactNode;
};

export const PageWrapper: FC<PageProps> = ({ children }) => {
  return (
    <AppBorder>
      <Box bgcolor="background.default">
        <Container>
          <Navigation />
          {children}
        </Container>
      </Box>
    </AppBorder>
  );
};
