import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useId, type ReactNode } from "react";
import {
  Control,
  Controller,
  type FieldValues,
  type FieldPathByValue,
} from "react-hook-form";

export type BooleanInputProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, boolean>;
  required?: boolean;
};

export const BooleanInput = <
  TFieldValues extends FieldValues,
  TContext = unknown,
>({
  control,
  name,
  label,
  required = false,
}: BooleanInputProps<TFieldValues, TContext>): ReactNode => {
  const helperTextId = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={error != null} fullWidth>
          <FormControlLabel
            control={<Switch aria-describedby={helperTextId} {...field} />}
            label={label}
          />
          <FormHelperText id={helperTextId} error={error != null}>
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
