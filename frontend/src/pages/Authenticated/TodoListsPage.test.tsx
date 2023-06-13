import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import TodoListsPage from "./TodoListsPage";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock server setup
const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

// Define the mock user
// const mockUser = {
//   id: 1,
//   name: "Mr.Tester",
//   email: "mrtester@test.com",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

// This way of mocking useAuth works, but is not required for this test file,
// because there are mocks for the service functions that require the user to be authenticated. And the mocks require no authentication. Just testing the UI
// vi.mock("../../components/Context/Auth/useAuth", () => ({
//   useAuth: () => ({
//     currentUser: mockUser,
//     setCurrentUser: vi.fn(),
//     setIsAuthenticated: vi.fn(),
//     isLoading: false,
//     logout: vi.fn(),
//     isAuthenticated: true,
//     refreshToken: vi.fn(),
//   }),
// }));

// Mocking the required list services instead of the rest handlers
vi.mock("../../services/list.service.ts", async () => ({
  getAllLists: vi.fn(() => Promise.resolve(todoLists)),
  newList: vi.fn(() => Promise.resolve(createdList)),
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

const createdList = {
  name: "Mr.Testers List",
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const restHandlers = [
  rest.get(`${apiEndpoint}/auth/re`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${apiEndpoint}/auth/refresh-token`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: "newToken" }));
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
  test("renders the page", async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <Router>
            <TodoListsPage />
          </Router>
        </AuthProvider>
      );
    });

    expect(screen.getByText("My TodoLists")).toBeInTheDocument();
  });
});

describe("NewListForm Component", () => {
  test("creating new list in TodoListsPage with NewListForm", async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <Router>
            <TodoListsPage />
          </Router>
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.findAllByText(/Delete/i));
    });

    // console.log(screen.debug());

    const newListButton = await screen.findByText("New List");
    await userEvent.click(newListButton);

    const listLabel = await screen.findByLabelText(/List Name/i);
    await userEvent.type(listLabel, "Mr.Testers List");

    const createListButton = await screen.findByTestId("create-list");
    await userEvent.click(createListButton);

    // expect(await screen.findByText("Mr.Testers List")).toBeInTheDocument();
  });
});
