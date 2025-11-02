import { TextField } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import {
  type Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";
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
          slotProps={{
            input: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputComponent: StringNumericFormat as any,
            },
          }}
          {...field}
        />
      )}
    />
  );
};

interface StringNumericFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const StringNumericFormat = forwardRef<
  NumericFormatProps,
  StringNumericFormatProps
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
