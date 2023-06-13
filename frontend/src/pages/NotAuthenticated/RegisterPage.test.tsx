import RegisterPage from "./RegisterPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";

// Tests
describe("Register Page", () => {
  // Tests that the app renders
  test("renders the register page", () => {
    render(
      <AuthProvider>
        <Router>
          <RegisterPage />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("Create a new account")).toBeInTheDocument();
  });
});
