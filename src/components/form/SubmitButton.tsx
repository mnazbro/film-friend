import { Button } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { useFormContext } from "./FormContext.tsx";

export type SubmitButtonProps = PropsWithChildren;

export const SubmitButton = ({ children }: SubmitButtonProps): ReactNode => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};
