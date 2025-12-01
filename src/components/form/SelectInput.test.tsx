import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { useAppForm } from "./Form";

const TestComponent = (props: Parameters<typeof useAppForm>[0]): ReactNode => {
  const form = useAppForm(props);

  return (
    <form.AppForm>
      <form.AppField name="testField">
        {(field) => (
          <field.SelectInput
            label="foo"
            options={{
              opt1: "Option 1",
              opt2: "Option 2",
            }}
          />
        )}
      </form.AppField>
      <form.SubmitButton>Submit</form.SubmitButton>
    </form.AppForm>
  );
};

describe("SelectInput", () => {
  test("Renders correctly with initial value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: "opt1",
        }}
        onSubmit={onSubmit}
      />,
    );

    const select = screen.getByRole("combobox", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    expect(select).toHaveTextContent("Option 1");
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: "opt1" }));
  });

  test("Updates correctly", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestComponent
        defaultValues={{
          testField: "",
        }}
        onSubmit={onSubmit}
      />,
    );

    const select = screen.getByRole("combobox", { name: "foo" });
    const button = screen.getByRole("button", { name: "Submit" });

    await user.click(select);

    const option2 = screen.getByRole("option", { name: "Option 2" });
    await user.click(option2);

    expect(select).toHaveTextContent("Option 2");
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith(expectFormValue({ testField: "opt2" }));
  });
});

function expectFormValue(value: unknown): unknown {
  return expect.objectContaining({
    value: value,
  });
}
