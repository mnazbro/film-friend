import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import {
  Control,
  Controller,
  type FieldValues,
  type FieldPathByValue,
} from "react-hook-form";
import { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

export type NumberInputProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, number>;
  required?: boolean;
};

export const NumberInput = <
  TFieldValues extends FieldValues,
  TContext = unknown,
>({
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
