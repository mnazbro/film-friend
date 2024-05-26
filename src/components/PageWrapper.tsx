import type { FC, ReactNode } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Navigation } from "./Navigation";
import { AppBorder } from "./AppBorder";
import Snackbar from "@mui/material/Snackbar";
import { useTheme } from "@mui/material";

export type PageProps = {
  children: ReactNode;
};

export const PageWrapper: FC<PageProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <AppBorder topBgColor={theme.palette.primary.main}>
      <Container sx={{ height: "100%" }}>
        <Stack height="100%">
          <Navigation />
          <Box flex={1}>{children}</Box>
        </Stack>
      </Container>
      <Snackbar />
    </AppBorder>
  );
};
