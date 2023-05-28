import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../components/LoginForm";
import { AuthProvider } from "../../components/context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("LoginForm Component", () => {
  test("renders the form", () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Log in to your account")).toBeInTheDocument();
  });

  test("allows the user to login successfully", async () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    userEvent.type(screen.getByLabelText(/Email Address/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Password/i), "password123");
    // Simulate user clicking on Sign In button
    userEvent.click(screen.getByRole("button", { name: "Sign In" }));

    // Wait for the form to be submnitted and get the state to be updated
    await waitFor(() => screen.getByText("Logged in successfully"));

    // make sure the correct successful message is displayed
    expect(screen.getByText("Logged in successfully")).toBeInTheDocument();
  });
});
