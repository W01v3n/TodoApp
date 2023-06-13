// Import necessary packages and components.
import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { RouteProps } from "react-router-dom";
import api from "../../../services/api.service";

// Define the structure of a User object.
export interface User {
  rest?: User;
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the structure of the authentication context.
// This context will hold the current user, a loading state, and methods to log in and log out.
export interface AuthContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  // login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshToken: () => Promise<void>;
}

// Create the context with React's createContext function.
// This context can hold a value of type AuthContextData, or it can be undefined.
// Initially, it's set to undefined.
export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

// Create a provider component. This component will provide the authentication context to all of its children.
// This is a common pattern in React: we define a context, then provide it using a special component.
export const AuthProvider = ({ children }: RouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // The current user and loading state are held in state variables.
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Use the useCookies hook to get access to the cookies
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // When the component mounts, it makes a request to the /auth/re endpoint to see if there is an authenticated user.
  useEffect(() => {
    const checkAuthenticatedUser = async () => {
      try {
        const response = await api.get("/auth/re");
        if (response.data.isAuthenticated) {
          setCurrentUser(response.data.rest);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        const refreshTokenResponse = await api.post("/auth/refresh-token");
        if (refreshTokenResponse.data.token) {
          // Retry to see if the user is now authenticated
          const response = await api.get("/auth/re");
          if (response.data.isAuthenticated) {
            setCurrentUser(response.data.rest);
            setIsAuthenticated(true);
          }
        }
        console.log(error);
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthenticatedUser();
  }, [cookies, isAuthenticated, isLoading]);

  async function refreshToken() {
    try {
      const response = await api.post("/auth/refresh-token");

      if (response.data.token) {
        setCurrentUser(response.data.rest);
        setCookie("token", response.data.token, { path: "/" });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      // console.log(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
      removeCookie("token");
    }
  }

  // The logout function makes a POST request to the /auth/refresh-token endpoint.
  // After the request, it clears the current user.
  async function logout() {
    try {
      const response = await api.post("/users/logout");
      if (response.status == 200) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        console.log("Logged out user.");
      } else {
        console.log(
          `Failed to logout: server responded with status ${response.status}`
        );
      }
    } catch (error) {
      console.log(`Failed to logout: ${error}`);
    }
  }

  // The provider component renders the AuthContext.Provider component with the current user, loading state, and login and logout functions as the value.
  // All children of this component will have access to these values.
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        logout,
        isAuthenticated,
        setCurrentUser,
        setIsAuthenticated,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
