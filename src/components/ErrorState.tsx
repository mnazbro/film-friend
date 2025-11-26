import ErrorIcon from "@mui/icons-material/Error";
import type { ReactNode } from "react";
import { NonIdealState, type NonIdealStateProps } from "./NonIdealState.tsx";

export type ErrorStateProps = Omit<NonIdealStateProps, "icon">;

export const ErrorState = (props: ErrorStateProps): ReactNode => {
  return <NonIdealState icon={<ErrorIcon fontSize="large" color="error" />} {...props} />;
};
