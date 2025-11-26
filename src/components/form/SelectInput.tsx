import { type ReactNode, useId } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useFieldContext } from "./FormContext.tsx";

export interface SelectInputProps<T extends string | number> {
  label: string;
  required?: boolean;
  options: Record<T, ReactNode>;
}

export function SelectInput<T extends string | number>({
  label,
  required = false,
  options,
}: SelectInputProps<T>): ReactNode {
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  const labelId = useId();
  const helperTextId = useId();
  return (
    <FormControl fullWidth variant="outlined" required={required} error={state.meta.errors.length > 0}>
      <InputLabel variant="outlined" id={labelId} required={required} error={state.meta.errors.length > 0}>
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        required={required}
        labelId={labelId}
        value={state.value}
        label={label}
        aria-describedby={helperTextId}
        onChange={(event: SelectChangeEvent) => {
          handleChange(event.target.value);
        }}
        onBlur={handleBlur}
        error={state.meta.errors.length > 0}
      >
        {Object.entries<ReactNode>(options).map(([value, label]) => {
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText id={helperTextId}>
        {state.meta.errors.map((error: Error) => error.message).join(", ")}
      </FormHelperText>
    </FormControl>
  );
}

export default SelectInput;
