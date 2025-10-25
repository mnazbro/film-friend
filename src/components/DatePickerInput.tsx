import { DatePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import {
  type Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";

export type DatePickerInputProps<TFieldValues extends FieldValues, TContext> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, string>;
  required?: boolean;
};

export const DatePickerInput = <TFieldValues extends FieldValues, TContext>({
  control,
  name,
  label,
  required = false,
}: DatePickerInputProps<TFieldValues, TContext>): ReactNode => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
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
