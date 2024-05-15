import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const AppBorder: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Stack
      direction="column"
      width="100dvw"
      height="100dvh"
      bgcolor="background.default"
    >
      <Box height="env(safe-area-inset-top)" />
      <Box flex={1}>{children}</Box>
      <Box height="env(safe-area-inset-bottom)" />
    </Stack>
  );
};
