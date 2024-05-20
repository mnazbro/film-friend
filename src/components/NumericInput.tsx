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

export type NumericInputProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, string>;
};

export const NumericInput = <
  TFieldValues extends FieldValues,
  TContext = unknown,
>({
  control,
  name,
  label,
}: NumericInputProps<TFieldValues, TContext>): ReactNode => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
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
  onChange: (event: { target: { name: string; value: string } }) => void;
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
            value: values.value,
          },
        });
      }}
      allowNegative={false}
    />
  );
});
