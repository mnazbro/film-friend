import { Link } from "@mui/material";
import { Link as TanStackLink } from "@tanstack/react-router";
import type { PropsWithChildren, ReactNode } from "react";

export type RouterLinkProps = PropsWithChildren<{
  to: string;
}>;

export const RouterLink = ({ to, children }: RouterLinkProps): ReactNode => {
  return (
    <Link
      color="inherit"
      variant="inherit"
      underline="none"
      component={TanStackLink}
      to={to}
    >
      {children}
    </Link>
  );
};
