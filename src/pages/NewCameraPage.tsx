import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import type { ReactNode } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { useAppForm } from "../components/form/Form.tsx";
import { useAppDispatch } from "../hooks/redux";
import { setActiveCamera } from "../store/activeSlice";
import { addCamera } from "../store/cameraSlice";
import { type CameraId, cameraSchema } from "../types";

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: newCameraSchema,
    },
    onSubmit: async ({ value }) => {
      const id: CameraId = `camera_${v4()}`;
      dispatch(
        addCamera({
          camera: {
            ...value,
            id,
          },
        }),
      );
      dispatch(setActiveCamera(id));
      await navigate({ to: "/" });
      enqueueSnackbar({ message: "Camera created successfully!", variant: "success" });
    },
  });

  return (
    <Stack spacing={1} py={1}>
      <Alert severity="info">
        <AlertTitle>Camera</AlertTitle>A camera allows you to associate specific shots with more metadata.
      </Alert>
      <form.AppForm>
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
            <form.SubmitButton>Create Camera</form.SubmitButton>
          </Stack>
        </form>
      </form.AppForm>
    </Stack>
  );
};
