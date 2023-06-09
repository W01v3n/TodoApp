import TodoListsPage from "./TodoListsPage";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../components/Context/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

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
