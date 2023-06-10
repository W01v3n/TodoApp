import LoginPage from "./LoginPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";

// Tests
describe("Login Page", () => {
  // Tests that the app renders
  test("renders the login page", () => {
    render(
      <AuthProvider>
        <Router>
          <LoginPage />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Log in to your account")).toBeInTheDocument();
  });
});
