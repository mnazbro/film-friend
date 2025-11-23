import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import { useAppForm } from "./Form";

const TestComponent = (props: Parameters<typeof useAppForm>[0]): ReactNode => {
  const form = useAppForm(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form.AppForm>
        <form.AppField name="testField">{(field) => <field.DatePickerInput label="foo" />}</form.AppField>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </LocalizationProvider>
  );
};

describe("DatePickerInput", () => {
  test("Submits form correctly with initial value", async () => {
    const user = userEvent.setup();
    const date = parseISO("2023-11-22");
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: date,
        }}
        onSubmit={onSubmit}
      />,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    const group = screen.getByRole("group", { name: "foo" });
    const year = within(group).getByRole("spinbutton", { name: "Year" });
    const month = within(group).getByRole("spinbutton", { name: "Month" });
    const day = within(group).getByRole("spinbutton", { name: "Day" });

    expect(year).toHaveValue(2023);
    expect(month).toHaveValue(11);
    expect(day).toHaveValue(22);
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: date }));

    await user.type(year, "2024");
    expect(year).toHaveValue(2024);
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: parseISO("2024-11-22") }));

    await user.type(month, "8");
    expect(month).toHaveValue(8);
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: parseISO("2024-08-22") }));

    await user.click(day);
    await user.keyboard("{delete}{delete}25");
    expect(day).toHaveValue(25);
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: parseISO("2024-08-25") }));
  });
});

function expectFormValue(value: unknown): unknown {
  return expect.objectContaining({
    value: value,
  });
}
