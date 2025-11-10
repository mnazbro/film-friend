import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import { useFieldContext } from "./FormContext.tsx";

export interface DropdownInputProps {
  label: string;
  required?: boolean;
}

export const DropdownInput = ({ label, required = false }: DropdownInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      required={required}
      value={state.value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      onBlur={handleBlur}
      helperText={state.meta.errors.map((error: Error) => error.message).join(", ")}
      error={state.meta.errors.length > 0}
    />
  );
};

export default DropdownInput;
