import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
  Typography,
} from "@mui/material";
import { type FC, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { NumericInput } from "../components/NumericInput";
import { TextInput } from "../components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues: FormInputs = {
  guideNumber: "66",
  iso: "400",
  flashPower: "1",
  unit: "ft",
};

const schema = z.object({
  guideNumber: z.string(),
  iso: z.string(),
  flashPower: z.string(),
  unit: z.enum(["ft", "m"]),
});

type FormInputs = z.infer<typeof schema>;

export const FlashPage: FC = () => {
  const [guideNumber, setGuideNumber] = useState<number>(
    Number(defaultValues.guideNumber),
  );
  const [multiplier, setMultiplier] = useState<number>(
    calculateMultiplier({
      iso: defaultValues.iso,
      flashPower: defaultValues.flashPower,
    }),
  );
  const { handleSubmit, control, watch } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormInputs> = ({
    iso,
    flashPower,
    guideNumber,
  }) => {
    setMultiplier(calculateMultiplier({ iso, flashPower }));
    setGuideNumber(parseInt(guideNumber));
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => {
      subscription.unsubscribe();
    };
  }, [handleSubmit, watch]);

  return (
    <Stack spacing={1}>
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
              <Grid size={6}>
                <TextInput
                  control={control}
                  name="guideNumber"
                  label="Guide Number"
                />
              </Grid>
              <Grid size={6}>
                <TextInput control={control} name="unit" label="Unit" />
              </Grid>
              <Grid size={12}>
                <TextInput control={control} name="iso" label="ISO" />
              </Grid>
              <Grid size={12}>
                <NumericInput
                  control={control}
                  name="flashPower"
                  label="Flash Power"
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

function calculateMultiplier({
  iso,
  flashPower,
}: {
  iso: string;
  flashPower: string;
}): number {
  return (parseInt(iso) / 100) * parseFloat(flashPower);
}
