import { render, screen, waitFor, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, test, afterEach, beforeAll, afterAll, vi } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ProtectedComponent from "./ProtectedComponent";
import { TodoListsPage } from "../../pages";
import { AuthProvider } from "../Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock server setup
const todoLists = [
  {
    createdAt: new Date(),
    id: 1,
    name: "Tests List",
    updatedAt: new Date(),
    userId: 1,
  },
  {
    createdAt: new Date(),
    id: 2,
    name: "Tests List2",
    updatedAt: new Date(),
    userId: 1,
  },
];

const isAuthRestHandlers = [
  rest.get("http://localhost:3000/api/auth/re", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isAuthenticated: true }));
  }),

  rest.post(
    "http://localhost:3000/api/auth/refresh-token",
    (_req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
  }),
];

const isNotAuthRestHandlers = [
  rest.get("http://localhost:3000/api/auth/re", (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ isAuthenticated: false }));
  }),

  rest.post(
    "http://localhost:3000/api/auth/refresh-token",
    (_req, res, ctx) => {
      return res(ctx.status(401));
    }
  ),
  rest.get("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
  }),
];

const server = setupServer();

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
describe("ProtectedComponent", () => {
  // Render the protected component if the user is authenticated
  test("renders the protected component when a user IS authenticated", async () => {
    server.use(...isAuthRestHandlers);
    render(
      <AuthProvider>
        <Router>
          <ProtectedComponent component={TodoListsPage} />
        </Router>
      </AuthProvider>
    );

    const content = await screen.findByRole("heading", {
      name: "My TodoLists",
    });

    expect(content).toBeInTheDocument();
  });

  // Do not render the protected component if the user is not authenticated
  test("does not render the protected component when a user IS NOT authenticated", async () => {
    server.use(...isNotAuthRestHandlers);
    render(
      <AuthProvider>
        <Router>
          <ProtectedComponent component={TodoListsPage} />
        </Router>
      </AuthProvider>
    );

    await waitFor(() => {
      const content = screen.queryByRole("heading", {
        name: "My TodoLists",
      });
      expect(content).not.toBeInTheDocument();
    });
  });
});
