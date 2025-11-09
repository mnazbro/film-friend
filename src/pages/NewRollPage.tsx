import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import type { ReactNode } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setActiveRoll } from "../store/activeSlice";
import { addRoll } from "../store/cameraSlice";
import { type CameraId, type RollId, rollSchema } from "../types";
import { useAppForm } from "../components/form/Form.tsx";

const newRollSchema = rollSchema.omit({
  id: true,
});
type FormInputs = z.infer<typeof newRollSchema>;

const defaultValues: FormInputs = {
  name: "",
  numberOfFrames: 0,
  iso: "100",
  description: "",
  loadDate: new Date().toISOString(),
  notes: "",
  format: "35mm",
  frames: [],
  visible: true,
};

type NewRollPageProps = {
  cameraId: CameraId;
};

export const NewRollPage = ({ cameraId }: NewRollPageProps): ReactNode => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const camera = useAppSelector((state) =>
    state.camera.cameras.find((camera) => camera.id === cameraId),
  );

  if (camera == null) {
    // TODO: Handle this better
    throw new Error("Oh no");
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: newRollSchema,
    },
    onSubmit: async ({ value }) => {
      const rollId: RollId = `roll_${v4()}`;
      dispatch(
        addRoll({
          cameraId: camera.id,
          roll: {
            ...value,
            id: rollId,
          },
        }),
      );
      dispatch(setActiveRoll(rollId));
      await navigate({ to: "/" });
      enqueueSnackbar({ message: "Added a new roll!", variant: "success" });
    },
  });

  return (
    <Stack spacing={1} py={1}>
      <Alert severity="info">
        <AlertTitle>Roll</AlertTitle>
        <Typography color="text.primary">
          A roll of film allows you to track the film inside your camera and
          frames that you take with that camera.
        </Typography>
      </Alert>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <Stack spacing={1}>
          <form.AppField name="name">
            {(field) => <field.TextInput label="Name" required />}
          </form.AppField>

          <form.AppField name="iso">
            {(field) => <field.TextInput label="ISO" required />}
          </form.AppField>

          <form.AppField
            name="numberOfFrames"
            validators={{
              onChange: ({ value }) => {
                const result = z.number().positive().safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => <field.NumberInput label="Number of Frames" required />}
          </form.AppField>

          <form.AppField name="description">
            {(field) => <field.TextInput label="Description" />}
          </form.AppField>

          <form.AppField name="loadDate">
            {(field) => <field.DateTimePickerInput label="Load Date" />}
          </form.AppField>

          <form.AppField name="shotAtIso">
            {(field) => <field.TextInput label="Shot at ISO" />}
          </form.AppField>

          <form.AppField name="notes">
            {(field) => <field.TextInput label="Notes" />}
          </form.AppField>

          <form.AppForm>
            <form.SubmitButton>Create Roll</form.SubmitButton>
          </form.AppForm>
        </Stack>
      </form>
    </Stack>
  );
};
