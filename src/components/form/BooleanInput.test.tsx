import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { useAppForm } from "./Form";

const TestComponent = (props: Parameters<typeof useAppForm>[0]): ReactNode => {
  const form = useAppForm(props);

  return (
    <form.AppForm>
      <form.AppField name="testField">{(field) => <field.BooleanInput label="foo" />}</form.AppField>
      <form.SubmitButton>Submit</form.SubmitButton>
    </form.AppForm>
  );
};

describe("BooleanInput", () => {
  test("Renders correctly with false initial value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: false,
        }}
        onSubmit={onSubmit}
      />,
    );

    const checkbox = screen.getByRole("switch", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    expect(checkbox).not.toBeChecked();
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: false }));
  });

  test("Renders correctly with true initial value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: true,
        }}
        onSubmit={onSubmit}
      />,
    );

    const checkbox = screen.getByRole("switch", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    expect(checkbox).toBeChecked();
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: true }));
  });

  test("Toggles correctly", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: false,
        }}
        onSubmit={onSubmit}
      />,
    );

    const checkbox = screen.getByRole("switch", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: true }));

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: false }));
  });
});

function expectFormValue(value: unknown): unknown {
  return expect.objectContaining({
    value: value,
  });
}
