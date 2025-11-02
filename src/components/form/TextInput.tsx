import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import { useFieldContext } from "./FormContext.tsx";

export type TextInputProps = {
  label: string;
  required?: boolean;
};

export const TextInput = ({
  label,
  required = false,
}: TextInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      required={required}
      value={state.value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      helperText={state.meta.errors.map((error) => error.message).join(", ")}
      error={state.meta.errors.length > 0}
    />
  );
};
