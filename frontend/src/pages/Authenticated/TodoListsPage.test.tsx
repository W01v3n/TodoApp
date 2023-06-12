import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import TodoListsPage, { NewListForm } from "./TodoListsPage";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
// import { useAuth } from "../../components/Context/Auth/useAuth";
// import { MockAuthProvider } from "../../components/Context/Auth/Mocked/MockAuthContext";

// Mock server setup

// Define the mock user
const mockUser = {
  id: 1,
  name: "Mr.Tester",
  email: "mrtester@test.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock("../../components/Context/Auth/useAuth", () => ({
  useAuth: () => ({
    currentUser: mockUser,
    setCurrentUser: vi.fn(),
    setIsAuthenticated: vi.fn(),
    isLoading: false,
    logout: vi.fn(),
    isAuthenticated: true,
    refreshToken: vi.fn(),
  }),
}));

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

const todoItemsList1 = [
  {
    id: 1,
    title: "item1",
    content: "item1 content",
    completed: false,
    listId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "item2",
    content: "item2 content",
    completed: false,
    listId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const todoItemsList2 = [
  {
    id: 3,
    title: "item3",
    content: "item3 content",
    completed: false,
    listId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "item4",
    content: "item4 content",
    completed: false,
    listId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const createdList = {
  name: "Mr.Testers List",
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const restHandlers = [
  rest.get("http://localhost:3000/api/auth/re", (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(
    "http://localhost:3000/api/auth/refresh-token",
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ token: "newToken" }));
    }
  ),

  rest.get("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoLists));
  }),

  rest.get("http://localhost:3000/api/lists/1/items", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoItemsList1));
  }),

  rest.get("http://localhost:3000/api/lists/2/items", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoItemsList2));
  }),

  rest.post("http://localhost:3000/api/lists", (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json(createdList));
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

describe("NewListForm Component", () => {
  test("creating new list in TodoListsPage with NewListForm", async () => {
    render(
      <AuthProvider>
        <Router>
          <TodoListsPage />
        </Router>
      </AuthProvider>
    );

    const newListButton = await screen.findByText("New List");
    await userEvent.click(newListButton);

    const listLabel = await screen.findByLabelText(/List Name/i);
    await userEvent.type(listLabel, "Mr.Testers List");

    const createListButton = await screen.findByTestId("create-list");
    await userEvent.click(createListButton);

    expect(await screen.findByText("Mr.Testers List")).toBeInTheDocument();
  });
});
