import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
      <Box flex={1} sx={{ overflowY: "auto" }}>
        {children}
      </Box>
      <Box height="env(safe-area-inset-bottom)" />
    </Stack>
  );
};
