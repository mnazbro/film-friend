import { Link } from "@mui/material";
import { Link as TanStackLink } from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";

export type RouterLinkProps = PropsWithChildren<{
  to: string;
}>;

export const RouterLink: FC<RouterLinkProps> = ({ to, children }) => {
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
