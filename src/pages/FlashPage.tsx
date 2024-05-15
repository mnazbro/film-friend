import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NumericFormatCustom } from "../components/NumericFormatCustom";

type FormInputs = {
  guideNumber: string;
  iso: string;
  flashPower: string;
  unit: "ft" | "m";
};

export const FlashPage: FC = () => {
  const [guideNumber, setGuideNumber] = useState<number>(1);
  const [multiplier, setMultiplier] = useState<number>(1);
  const { handleSubmit, control, watch } = useForm<FormInputs>({
    defaultValues: {
      guideNumber: "66",
      iso: "400",
      flashPower: "1",
      unit: "ft",
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setMultiplier((100 / parseInt(data.iso)) * parseFloat(data.flashPower));
    setGuideNumber(parseInt(data.guideNumber));
  };
  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => {
      subscription.unsubscribe();
    };
  }, [handleSubmit, watch]);

  return (
    <Stack spacing={1} py={1}>
      <Alert severity="info">
        Manual flash calculates distance for you. Given input, check the table
        for correct exposure.
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography>Settings</Typography>
              <Typography
                sx={{ color: "text.secondary" }}
              >{`GN(${watch("guideNumber")}) / ISO(${watch("iso")}) / FP(${watch("flashPower")})`}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="guideNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Guide Number"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="unit"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Unit"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="iso"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="ISO"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="flashPower"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Flash Power"
                      variant="outlined"
                      type="text"
                      inputMode="numeric"
                      fullWidth
                      InputProps={{
                        inputComponent: NumericFormatCustom as any,
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>F-Stop</TableCell>
              <TableCell>{`Distance (${watch("unit")})`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1.8, 2.8, 4, 5.6, 8, 11, 16, 22].map((fstop) => {
              return (
                <TableRow key={fstop}>
                  <TableCell>{fstop}</TableCell>
                  <TableCell>
                    {Math.round(((multiplier * guideNumber) / fstop) * 100) /
                      100}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
