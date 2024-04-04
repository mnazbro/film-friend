import { useState, type FC, ReactNode } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Navigation } from "./Navigation";

export type PageProps = {
  children: ReactNode;
};

export const PageWrapper: FC<PageProps> = ({ children }) => {
  return (
    <Box bgcolor={"background.default"}>
      <Container>
        <Navigation />
        {children}
      </Container>
    </Box>
  );
};
