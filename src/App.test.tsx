import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import { createAppStore } from "./store/store";

describe("App", () => {
  test("renders without crashing", () => {
    const store = createAppStore();
    const { baseElement } = render(<App store={store} />);
    expect(baseElement).toBeDefined();
  });
});
