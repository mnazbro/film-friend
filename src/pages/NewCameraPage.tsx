import { Alert, AlertTitle, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { useAppDispatch } from "../hooks/redux";
import { addCamera } from "../store/cameraSlice";
import { type CameraId, cameraSchema } from "../types";
import { useAppForm } from "../components/form/Form.tsx";

const newCameraSchema = cameraSchema.omit({
  id: true,
});
type FormInputs = z.infer<typeof newCameraSchema>;
const defaultValues: FormInputs = {
  name: "",
  description: "",
  filmFormat: "35mm",
  hasLightMeter: false,
  notes: "",
  visible: true,
  rolls: [],
  shutterSpeeds: [],
};

export const NewCameraPage = (): ReactNode => {
  const dispatch = useAppDispatch();

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: newCameraSchema,
    },
    onSubmit: ({ value }) => {
      const id: CameraId = `camera_${v4()}`;
      dispatch(
        addCamera({
          camera: {
            ...value,
            id,
          },
        }),
      );
    },
  });

  return (
    <Stack spacing={1} py={1}>
      <Alert severity="info">
        <AlertTitle>Camera</AlertTitle>A camera allows you to associate specific shots with more metadata.
      </Alert>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <Stack spacing={1}>
          <form.AppField name="name">{(field) => <field.TextInput label="Name" />}</form.AppField>
          <form.AppField name="description">{(field) => <field.TextInput label="Description" />}</form.AppField>
          <form.AppField name="filmFormat">{(field) => <field.TextInput label="Film Format" />}</form.AppField>
          <form.AppField name="hasLightMeter">
            {(field) => <field.BooleanInput label="Has Light meter" />}
          </form.AppField>
          <form.AppField name="notes">{(field) => <field.TextInput label="Notes" />}</form.AppField>
          <form.AppForm>
            <form.SubmitButton>Create Camera</form.SubmitButton>
          </form.AppForm>
        </Stack>
      </form>
    </Stack>
  );
};
