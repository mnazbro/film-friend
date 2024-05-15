import { Alert, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  filmSize: string;
  shutterSpeeds: number[];
  hasLightMeter: boolean;
  lastTimeServiced?: Date;
  notes: string;
};

export const NewCameraPage: FC = () => {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      filmSize: "",
      shutterSpeeds: [],
      hasLightMeter: false,
      lastTimeServiced: undefined,
      notes: "",
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {};

  return (
    <Stack spacing={1} py={1}>
      <Alert severity="info">
        Manual flash calculates distance for you. Given input, check the table
        for correct exposure.
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Name" variant="outlined" fullWidth {...field} />
          )}
        />
        <Controller
          name="filmSize"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Film Size"
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
      </form>
    </Stack>
  );
};
