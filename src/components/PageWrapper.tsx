import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { FC, ReactNode } from "react";
import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";

export type PageProps = {
  hasBack?: boolean;
  children: ReactNode;
};

export const PageWrapper: FC<PageProps> = ({ hasBack = true, children }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      width="100dvw"
      height="100dvh"
      bgcolor="background.default"
      overflow="hidden"
    >
      <Navigation />
      <Box
        flex={1}
        overflow="hidden auto"
        pt={1}
        pb={`calc(max(env(safe-area-inset-bottom), ${theme.spacing(1)}))`}
        pl={`calc(max(env(safe-area-inset-left), ${theme.spacing(2)}))`}
        pr={`calc(max(env(safe-area-inset-right), ${theme.spacing(2)}))`}
      >
        {hasBack && (
          <Box mb={1}>
            <BackButton />
          </Box>
        )}
        {children}
      </Box>
    </Stack>
  );
};
