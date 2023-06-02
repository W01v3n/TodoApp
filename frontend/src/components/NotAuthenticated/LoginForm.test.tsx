import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { AuthProvider } from "../Context/AuthContext";
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

  test("fill login form and perform a successful login", async () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "test@example.com"
    );

    await userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Simulate user clicking on Sign In button
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

    // Wait for the form to be submnitted and get the state to be updated
    await waitFor(() => screen.getByText("Logged in successfully"));

    // make sure the correct successful message is displayed
    expect(screen.getByText("Logged in successfully")).toBeInTheDocument();
  });

  test("fill login form with invalid credentials and get a failed login message", async () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "noauth@example.com"
    );

    await userEvent.type(screen.getByLabelText(/Password/i), "password111");

    // Simulate user clicking on Sign In button
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

    // Wait for the form to be submnitted and get the state to be updated
    await waitFor(() =>
      screen.getByText("Authentication failed, please check your credentials.")
    );

    // make sure the correct successful message is displayed
    expect(
      screen.getByText("Authentication failed, please check your credentials.")
    ).toBeInTheDocument();
  });

  test("fill login form with invalid email and get email not valid", async () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "example.com"
    );
    await userEvent.type(screen.getByLabelText(/Password/i), "password111");

    await waitFor(() => screen.getByText("Email is not valid!"));
    expect(screen.getByText("Email is not valid!"));
  });
});
