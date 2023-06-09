import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";
import { AuthProvider } from "../Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("RegisterForm Component", () => {
  test("renders the form", () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Create a new account")).toBeInTheDocument();
  });

  test("fill register form and perform a successful registration", async () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(screen.getByLabelText(/First Name/i), "Mr.");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Tester");

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "testregister@example.com"
    );

    await userEvent.type(
      screen.getAllByLabelText(/Password/i)[0],
      "password123"
    );
    await userEvent.type(
      screen.getByLabelText(/Verify Password/i),
      "password123"
    );

    // Simulate user clicking on Sign In button
    await userEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    // Wait for the form to be submnitted and get the state to be updated
    await waitFor(() => screen.getByText("Registration Successful!"));

    // make sure the correct successful message is displayed
    expect(screen.getByText("Registration Successful!")).toBeInTheDocument();
  });

  test("fill register form with invalid email and get email not valid", async () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(screen.getByLabelText(/First Name/i), "Mr.");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Tester");

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "example.com"
    );

    await userEvent.type(
      screen.getAllByLabelText(/Password/i)[0],
      "password123"
    );
    await userEvent.type(
      screen.getByLabelText(/Verify Password/i),
      "password123"
    );

    await waitFor(() => screen.getByText("Email is not valid!"));
    expect(screen.getByText("Email is not valid!"));
  });

  test("fill register form with invalid password and get password has to be more than 6 characters", async () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(screen.getByLabelText(/First Name/i), "Mr.");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Tester");

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "errorpas6chars@example.com"
    );

    await userEvent.type(screen.getAllByLabelText(/Password/i)[0], "123");
    await userEvent.type(screen.getByLabelText(/Verify Password/i), "123");

    await waitFor(() =>
      screen.getByText("Password has to be at least 6 characters.")
    );
    expect(screen.getByText("Password has to be at least 6 characters."));
  });

  test("fill register form with passwords that don't match and get passwords do not match", async () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterForm />
        </Router>
      </AuthProvider>
    );

    // Simulate user typings
    await userEvent.type(screen.getByLabelText(/First Name/i), "Mr.");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Tester");

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      "errorpas6chars@example.com"
    );

    await userEvent.type(
      screen.getAllByLabelText(/Password/i)[0],
      "password123"
    );
    await userEvent.type(
      screen.getByLabelText(/Verify Password/i),
      "password1234"
    );

    await waitFor(() => screen.getAllByText("Passwords do not match"));
    expect(screen.getAllByText("Passwords do not match"));
  });
});
