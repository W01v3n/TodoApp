import { render, screen } from "@testing-library/react";
import FeatureSection from "./FeatureSection";

it("Should have a feature section", () => {
  render(<FeatureSection />);
  const message = screen.queryByText(/Features/i);
  expect(message).toBeVisible();
});

vitest.mock("../../services/api.service");
