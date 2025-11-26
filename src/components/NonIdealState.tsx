import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export interface NonIdealStateProps {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
}

export const NonIdealState = ({ title, icon, action }: NonIdealStateProps): ReactNode => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" height="100%" spacing={1}>
      {icon}
      <Typography variant="subtitle2" align="center">
        {title}
      </Typography>
      {action}
    </Stack>
  );
};
