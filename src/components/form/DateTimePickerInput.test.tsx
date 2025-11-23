import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAppForm } from "./Form";

const TestComponent = (props: Parameters<typeof useAppForm>[0]): ReactNode => {
  const form = useAppForm(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form.AppForm>
        <form.AppField name="testField">{(field) => <field.DateTimePickerInput label="foo" />}</form.AppField>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </LocalizationProvider>
  );
};

describe("DateTimePickerInput", () => {
  test("Renders correctly with initial value", async () => {
    const user = userEvent.setup();
    const date = new Date(2023, 10, 22, 10, 30); // Nov 22 2023 10:30
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
    const hours = within(group).getByRole("spinbutton", { name: "Hours" });
    const minutes = within(group).getByRole("spinbutton", { name: "Minutes" });
    const meridiem = within(group).getByRole("spinbutton", { name: "Meridiem" });

    expect(year).toHaveValue(2023);
    expect(month).toHaveValue(11);
    expect(day).toHaveValue(22);
    expect(hours).toHaveValue(10);
    expect(minutes).toHaveValue(30);
    expect(meridiem).toHaveTextContent("AM");

    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: date }));
  });

  test("Updates correctly", async () => {
    const user = userEvent.setup();
    const initialDate = new Date(2023, 10, 22, 10, 30); // Nov 22 2023 10:30
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: initialDate,
        }}
        onSubmit={onSubmit}
      />,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    const group = screen.getByRole("group", { name: "foo" });
    const year = within(group).getByRole("spinbutton", { name: "Year" });
    const month = within(group).getByRole("spinbutton", { name: "Month" });
    const day = within(group).getByRole("spinbutton", { name: "Day" });
    const hours = within(group).getByRole("spinbutton", { name: "Hours" });
    const minutes = within(group).getByRole("spinbutton", { name: "Minutes" });

    // Update to Nov 23 2023 11:30
    await user.click(year);
    await user.clear(year);
    await user.keyboard("2023"); // Same year
    await user.click(month);
    await user.clear(month);
    await user.keyboard("11"); // Same month
    await user.click(day);
    await user.clear(day);
    await user.keyboard("23"); // Change day
    await user.click(hours);
    await user.clear(hours);
    await user.keyboard("11"); // Change hour
    await user.click(minutes);
    await user.clear(minutes);
    await user.keyboard("30"); // Same minute

    expect(year).toHaveValue(2023);
    expect(month).toHaveValue(11);
    expect(day).toHaveValue(23);
    expect(hours).toHaveValue(11);
    expect(minutes).toHaveValue(30);

    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: new Date(2023, 10, 23, 11, 30) }));
  });
});

function expectFormValue(value: unknown): unknown {
  return expect.objectContaining({
    value: value,
  });
}
