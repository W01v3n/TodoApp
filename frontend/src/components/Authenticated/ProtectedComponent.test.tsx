import { render, screen, waitFor, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, test, afterEach, beforeAll, afterAll, vi } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import TestApp from "../TestComponents/TestApp";

// Mock server setup
const apiEndpoint = import.meta.env.VITE_API_BASE_URL;
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
  rest.get(`${apiEndpoint}/auth/re`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ isAuthenticated: true }));
  }),

  rest.post(`${apiEndpoint}/auth/refresh-token`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${apiEndpoint}/lists`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
  }),
];

const isNotAuthRestHandlers = [
  rest.get(`${apiEndpoint}/auth/re`, (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ isAuthenticated: false }));
  }),

  rest.post(`${apiEndpoint}/auth/refresh-token`, (_req, res, ctx) => {
    return res(ctx.status(401));
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
      <MemoryRouter initialEntries={["/lists"]}>
        <TestApp />
      </MemoryRouter>
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
      <MemoryRouter initialEntries={["/lists"]}>
        <TestApp />
      </MemoryRouter>
    );

    await waitFor(() => {
      const content = screen.queryByRole("heading", {
        name: "My TodoLists",
      });
      expect(content).not.toBeInTheDocument();
      const loginEmailLabel = screen.getByLabelText(/Email Address/i);
      expect(loginEmailLabel).toBeInTheDocument();
    });
  });
});
