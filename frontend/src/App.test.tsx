import App from "./App";
import { render, screen } from "@testing-library/react";

// Tests
describe("App Component", () => {
  // Tests that the app renders
  test("renders the app", () => {
    render(<App />);

    expect(screen.getByText("THYNKSO")).toBeInTheDocument();
  });
});
