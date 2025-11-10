import Link from "@mui/material/Link";
import { Link as TanStackLink } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface RouterLinkProps {
  children: ReactNode;
  to: string;
}

export const RouterLink = ({ to, children }: RouterLinkProps): ReactNode => {
  return (
    <Link color="inherit" variant="inherit" underline="none" component={TanStackLink} to={to}>
      {children}
    </Link>
  );
};
