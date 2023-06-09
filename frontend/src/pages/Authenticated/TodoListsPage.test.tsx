import { render, screen, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import TodoListsPage from "./TodoListsPage";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { isAxiosError } from "axios";

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

const restHandlers = [
  rest.get("http://localhost:3000/api/auth/re", (_req, res, ctx) => {
    return res(ctx.status(401));
  }),
  rest.post(
    "http://localhost:3000/api/auth/refresh-token",
    (_req, res, ctx) => {
      return res(ctx.status(401), ctx.json({ token: "newToken" }));
    }
  ),

  rest.get("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
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
describe("TodoListsPage Component", () => {
  test("renders the page", () => {
    render(
      <AuthProvider>
        <Router>
          <TodoListsPage />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByText("My TodoLists")).toBeInTheDocument();
  });
});
