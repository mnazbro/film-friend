import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { type ReactNode, useId } from "react";
import { useFieldContext } from "./FormContext.tsx";

export interface BooleanInputProps {
  label: string;
  required?: boolean;
}

export const BooleanInput = ({ label, required = false }: BooleanInputProps): ReactNode => {
  const helperTextId = useId();
  const { state, handleChange, handleBlur } = useFieldContext<boolean>();
  return (
    <FormControl error={state.meta.errors.length > 0} fullWidth>
      <FormControlLabel
        control={
          <Switch
            aria-describedby={helperTextId}
            checked={state.value}
            onChange={(e) => {
              handleChange(e.target.checked);
            }}
            onBlur={handleBlur}
            required={required}
          />
        }
        label={label}
      />
      <FormHelperText id={helperTextId}>
        {state.meta.errors.map((error: Error) => error.message).join(", ")}
      </FormHelperText>
    </FormControl>
  );
};

export default BooleanInput;
