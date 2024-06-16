import Link from "@mui/material/Link";
import type { FC, PropsWithChildren } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export type RouterLinkProps = PropsWithChildren<{
  to: string;
}>;

export const RouterLink: FC<RouterLinkProps> = ({ to, children }) => {
  return (
    <Link
      color="inherit"
      variant="inherit"
      underline="none"
      component={ReactRouterLink}
      to={to}
    >
      {children}
    </Link>
  );
};
