import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useId, type FC, type ReactNode } from "react";
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
  const inputId = useId();
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