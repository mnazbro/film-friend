import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import {
  type Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

export type NumberInputProps<TFieldValues extends FieldValues, TContext> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, number>;
  required?: boolean;
};

export const NumberInput = <TFieldValues extends FieldValues, TContext>({
  control,
  name,
  label,
  required = false,
}: NumberInputProps<TFieldValues, TContext>): ReactNode => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          type="text"
          inputMode="numeric"
          fullWidth
          helperText={error?.message}
          error={error != null}
          InputProps={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            inputComponent: NumericFormatCustom as any,
          }}
          {...field}
        />
      )}
    />
  );
};

interface NumericFormatCustomProps {
  onChange: (event: { target: { name: string; value: number } }) => void;
  name: string;
}

export const NumericFormatCustom = forwardRef<
  NumericFormatProps,
  NumericFormatCustomProps
>(function NumericFormatCustom(props, ref) {
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
