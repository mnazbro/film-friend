import { DateTimePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import { useFieldContext } from "./FormContext.tsx";

export interface DateTimePickerInputProps {
  label: string;
  required?: boolean;
}

export const DateTimePickerInput = ({ label, required = false }: DateTimePickerInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<Date | null>();
  return (
    <DateTimePicker
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
          helperText: state.meta.errors.map((error: Error) => error.message).join(", "),
          error: state.meta.errors.length > 0,
        },
      }}
    />
  );
};

export default DateTimePickerInput;
