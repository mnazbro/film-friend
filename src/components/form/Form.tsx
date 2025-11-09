import { createFormHook } from "@tanstack/react-form";
import { TextInput } from "./TextInput.tsx";
import { BooleanInput } from "./BooleanInput.tsx";
import { SubmitButton } from "./SubmitButton.tsx";
import { fieldContext, formContext } from "./FormContext.tsx";
import { NumericInput } from "./NumericInput.tsx";
import { NumberInput } from "./NumberInput.tsx";
import { DatePickerInput } from "./DatePickerInput.tsx";
import { DateTimePickerInput } from "./DateTimePickerInput.tsx";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextInput,
    BooleanInput,
    NumericInput,
    NumberInput,
    DatePickerInput,
    DateTimePickerInput,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
