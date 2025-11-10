import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { useFieldContext } from "./FormContext.tsx";

export interface NumericInputProps {
  label: string;
}

export const NumericInput = ({ label }: NumericInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  return (
    <TextField
      label={label}
      variant="outlined"
      type="text"
      inputMode="numeric"
      fullWidth
      value={state.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement & { value: string }).value;
        handleChange(value);
      }}
      onBlur={handleBlur}
      helperText={state.meta.errors.map((error: Error) => error.message).join(", ")}
      error={state.meta.errors.length > 0}
      slotProps={{
        input: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
          inputComponent: StringNumericFormat as any,
        },
      }}
    />
  );
};

interface StringNumericFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const StringNumericFormat = forwardRef<NumericFormatProps, StringNumericFormatProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        allowNegative={false}
      />
    );
  },
);
