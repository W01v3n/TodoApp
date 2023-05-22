import { RouteProps } from "react-router-dom";

type RouteType = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  isProtected?: boolean;
} & RouteProps;

import { HomePage, TodoListsPage, LoginPage, RegisterPage } from "./pages";
import Logout from "./components/Authenticated/Logout";

const routes: RouteType[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/lists",
    component: TodoListsPage,
    isProtected: true,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/logout",
    component: Logout,
  },
];

export default routes;
