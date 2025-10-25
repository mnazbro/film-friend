import { Button } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export type SubmitButtonProps = PropsWithChildren;

export const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  return (
    <Button type="submit" variant="contained" color="primary">
      {children}
    </Button>
  );
};
