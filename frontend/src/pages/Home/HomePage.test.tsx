import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";

it("should render the home page", () => {
  render(
    <AuthProvider>
      <Router>
        <HomePage />
      </Router>
    </AuthProvider>
  );
  const message = screen.queryByText(/Features/i);
  expect(message).toBeVisible();
});
