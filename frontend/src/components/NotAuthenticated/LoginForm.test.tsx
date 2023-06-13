import { render, screen, waitFor, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import LoginForm from "./LoginForm";
import { AuthProvider } from "../Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock server setup
const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

const loggedInUser = {
  userId: 1,
  username: "TestUser",
  email: "test@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const restHandlers = [
  rest.post(`${apiEndpoint}/users/login`, async (_req, res, ctx) => {
    const { email, password } = await _req.json();
    if (email === "test@example.com" && password === "password123") {
      return res(ctx.status(200), ctx.json(loggedInUser));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Error in authentication." })
      );
    }
  }),
  rest.get(`${apiEndpoint}/auth/re`, (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ isAuthenticated: false }));
  }),

  rest.post(`${apiEndpoint}/auth/refresh-token`, (_req, res, ctx) => {
    return res(ctx.status(401));
  }),
];

const server = setupServer(...restHandlers);

// Set up server before tests and tear down after tests
expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => server.close());

// Tests
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
