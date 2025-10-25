import { DateTimePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import {
  type Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";

export type DateTimePickerInputProps<
  TFieldValues extends FieldValues,
  TContext,
> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, string>;
  required?: boolean;
};

export const DateTimePickerInput = <
  TFieldValues extends FieldValues,
  TContext,
>({
  control,
  name,
  label,
  required = false,
}: DateTimePickerInputProps<TFieldValues, TContext>): ReactNode => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          label={label}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              helperText: error?.message,
              error: error != null,
            },
          }}
          {...field}
        />
      )}
    />
  );
};
