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
import type { ReactNode } from "react";
import { useAppForm } from "../components/form/Form.tsx";
import { z } from "zod";

type FormInputs = {
  guideNumber: number;
  iso: number;
  flashPower: number;
  unit: "ft" | "m";
};

const defaultValues: FormInputs = {
  guideNumber: 66,
  iso: 400,
  flashPower: 1,
  unit: "ft",
};

export const FlashPage = (): ReactNode => {
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: z.object({
        guideNumber: z.int().positive(),
        iso: z.int().positive(),
        flashPower: z.number().min(0).max(1),
        unit: z.enum(["ft", "m"]),
      }),
    },
  });

  return (
    <Stack spacing={1}>
      <Alert severity="info">
        Manual flash calculates distance for you. Given input, check the table
        for correct exposure.
      </Alert>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <form.Subscribe
              selector={(state) => ({
                guideNumber: state.values.guideNumber,
                iso: state.values.iso,
                flashPower: state.values.flashPower,
              })}
            >
              {({ guideNumber, iso, flashPower }) => {
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>Settings</Typography>
                    <Typography
                      sx={{ color: "text.secondary" }}
                    >{`GN(${guideNumber}) / ISO(${iso}) / FP(${flashPower})`}</Typography>
                  </Stack>
                );
              }}
            </form.Subscribe>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid size={6}>
                <form.AppField name="guideNumber">
                  {(field) => <field.NumberInput label="Guide Number" />}
                </form.AppField>
              </Grid>
              <Grid size={6}>
                <form.AppField name="unit">
                  {(field) => <field.TextInput label="Unit" />}
                </form.AppField>
              </Grid>
              <Grid size={12}>
                <form.AppField name="iso">
                  {(field) => <field.NumberInput label="ISO" />}
                </form.AppField>
              </Grid>
              <Grid size={12}>
                <form.AppField name="flashPower">
                  {(field) => <field.NumberInput label="Flash Power" />}
                </form.AppField>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
      <TableContainer component={Paper}>
        <form.Subscribe
          selector={(state) => ({
            unit: state.values.unit,
            guideNumber: state.values.guideNumber,
            iso: state.values.iso,
            flashPower: state.values.flashPower,
          })}
        >
          {({ unit, guideNumber, iso, flashPower }) => (
            <OutputTable
              unit={unit}
              guideNumber={guideNumber}
              iso={iso}
              flashPower={flashPower}
            />
          )}
        </form.Subscribe>
      </TableContainer>
    </Stack>
  );
};

type OutputTableProps = {
  unit: "ft" | "m";
  guideNumber: number;
  iso: number;
  flashPower: number;
};

const OutputTable = ({
  unit,
  guideNumber,
  iso,
  flashPower,
}: OutputTableProps) => {
  const multiplier = calculateMultiplier({ iso, flashPower });
  const valuesPerFstop = [1.8, 2.8, 4, 5.6, 8, 11, 16, 22].map((fstop) => {
    return [
      fstop,
      Math.round(((multiplier * guideNumber) / fstop) * 100) / 100,
    ];
  });
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>F-Stop</TableCell>
          <TableCell>{`Distance (${unit})`}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {valuesPerFstop.map(([fstop, value]) => {
          return (
            <TableRow key={fstop}>
              <TableCell>{fstop}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

function calculateMultiplier({
  iso,
  flashPower,
}: {
  iso: number;
  flashPower: number;
}): number {
  return (iso / 100) * flashPower;
}
