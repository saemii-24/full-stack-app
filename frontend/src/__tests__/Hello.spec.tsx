import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Hello from "./Hello";

describe("hello component", () => {
  it("Hello component render", () => {
    render(<Hello />);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
});
