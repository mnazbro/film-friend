import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";

type AppBorderProps = PropsWithChildren<{
  topBgColor?: BoxProps["bgcolor"];
  bottomBgColor?: BoxProps["bgcolor"];
}>;

export const AppBorder: FC<AppBorderProps> = ({
  topBgColor,
  children,
  bottomBgColor,
}) => {
  return (
    <Stack
      direction="column"
      width="100dvw"
      height="100dvh"
      bgcolor="background.default"
    >
      <Box height="env(safe-area-inset-top)" bgcolor={topBgColor} />
      <Box flex={1} sx={{ overflowY: "auto" }}>
        {children}
      </Box>
      <Box height="env(safe-area-inset-bottom)" bgcolor={bottomBgColor} />
    </Stack>
  );
};
