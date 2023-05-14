import { RouteProps } from "react-router-dom";

type RouteType = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  isProtected?: boolean;
} & RouteProps;

import {
  HomePage,
  ListPage,
  ListsPage,
  LoginPage,
  RegisterPage,
} from "./pages";

const routes: RouteType[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/lists",
    component: ListsPage,
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
  // {
  //   path: "/lists/:listName",
  //   component: ListPage,
  // },
];

export default routes;
