import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { type ReactNode, useId } from "react";
import {
  type Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";

export type BooleanInputProps<TFieldValues extends FieldValues, TContext> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, boolean>;
  required?: boolean;
};

export const BooleanInput = <TFieldValues extends FieldValues, TContext>({
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
