import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { useAppForm } from "./Form";

const TestComponent = (props: Parameters<typeof useAppForm>[0]): ReactNode => {
  const form = useAppForm(props);

  return (
    <form.AppForm>
      <form.AppField name="testField">{(field) => <field.NumberInput label="foo" />}</form.AppField>
      <form.SubmitButton>Submit</form.SubmitButton>
    </form.AppForm>
  );
};

describe("NumberInput", () => {
  test("Renders correctly with initial value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: 123,
        }}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByRole("textbox", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    expect(input).toHaveValue("123");
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: 123 }));
  });

  test("Updates correctly", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: 0,
        }}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByRole("textbox", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    await user.type(input, "456");
    expect(input).toHaveValue("456");
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: 456 }));
  });
});

function expectFormValue(value: unknown): unknown {
  return expect.objectContaining({
    value: value,
  });
}
