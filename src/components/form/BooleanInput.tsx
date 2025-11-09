import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { type ReactNode, useId } from "react";
import { useFieldContext } from "./FormContext.tsx";

export type BooleanInputProps = {
  label: string;
  required?: boolean;
};

export const BooleanInput = ({
  label,
  required = false,
}: BooleanInputProps): ReactNode => {
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
        {state.meta.errors.map((error) => error.message).join(", ")}
      </FormHelperText>
    </FormControl>
  );
};
