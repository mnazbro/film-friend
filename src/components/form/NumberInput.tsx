import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { useFieldContext } from "./FormContext.tsx";

export interface NumberInputProps {
  label: string;
  required?: boolean;
}

export const NumberInput = ({ label, required = false }: NumberInputProps): ReactNode => {
  const { state, handleChange, handleBlur } = useFieldContext<number>();
  return (
    <TextField
      label={label}
      variant="outlined"
      type="text"
      inputMode="numeric"
      fullWidth
      required={required}
      value={state.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement & { value: number }).value;
        handleChange(value);
      }}
      onBlur={handleBlur}
      helperText={state.meta.errors.map((error: Error) => error.message).join(", ")}
      error={state.meta.errors.length > 0}
      slotProps={{
        input: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
          inputComponent: NumberFormat as any,
        },
      }}
    />
  );
};

interface NumberFormatProps {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

export const NumberFormat = forwardRef<NumericFormatProps, NumberFormatProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue ?? 0,
          },
        });
      }}
      allowNegative={false}
    />
  );
});
