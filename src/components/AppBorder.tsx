import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";

type AppBorderProps = PropsWithChildren<{
  topBgColor?: BoxProps["bgcolor"];
  leftBgColor?: BoxProps["bgcolor"];
  rightBgColor?: BoxProps["bgcolor"];
  bottomBgColor?: BoxProps["bgcolor"];
}>;

export const AppBorder: FC<AppBorderProps> = ({
  bottomBgColor,
  children,
  leftBgColor,
  rightBgColor,
  topBgColor,
}) => {
  return (
    <Stack
      direction="column"
      width="100dvw"
      height="100dvh"
      bgcolor="background.default"
    >
      <Box height="env(safe-area-inset-top)" bgcolor={topBgColor} />
      <Stack direction="row" flex={1}>
        <Box width="env(safe-area-inset-left)" bgcolor={leftBgColor} />
        <Box flex={1} overflow="hidden scroll">{children}</Box>
        <Box width="env(safe-area-inset-right)" bgcolor={rightBgColor} />
      </Stack>
      <Box height="env(safe-area-inset-bottom)" bgcolor={bottomBgColor} />
    </Stack>
  );
};
