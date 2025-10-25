import ErrorIcon from "@mui/icons-material/Error";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";

export type NonIdealStateProps = {
  title: string;
};

export const NonIdealState: FC<NonIdealStateProps> = ({ title }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      spacing={1}
    >
      <ErrorIcon fontSize="large" color="error" />
      <Typography variant="subtitle2" align="center">
        {title}
      </Typography>
    </Stack>
  );
};
