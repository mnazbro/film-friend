import { DatePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import { useFieldContext } from "./FormContext.tsx";

export type DatePickerInputProps = {
  label: string;
  required?: boolean;
};

export const DatePickerInput = ({
  label,
  required = false,
}: DatePickerInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<Date | null>();
  return (
    <DatePicker
      label={label}
      value={state.value}
      onChange={(value) => {
        handleChange(value);
      }}
      slotProps={{
        textField: {
          variant: "outlined",
          fullWidth: true,
          required,
          onBlur: handleBlur,
          helperText: state.meta.errors
            .map((error) => error.message)
            .join(", "),
          error: state.meta.errors.length > 0,
        },
      }}
    />
  );
};
