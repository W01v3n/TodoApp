// Import necessary packages and components.
import { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { RouteProps } from "react-router-dom";
import api from "../../services/api.service";

// Define the structure of a User object.
interface User {
  rest?: User;
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the structure of the authentication context.
// This context will hold the current user, a loading state, and methods to log in and log out.
interface AuthContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshToken: () => Promise<void>;
}

// Create the context with React's createContext function.
// This context can hold a value of type AuthContextData, or it can be undefined.
// Initially, it's set to undefined.
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Create a provider component. This component will provide the authentication context to all of its children.
// This is a common pattern in React: we define a context, then provide it using a special component.
export const AuthProvider = ({ children }: RouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // The current user and loading state are held in state variables.
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Use the useCookies hook to get access to the cookies
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  function isObjectEmpty(object: any) {
    return Object.keys(object).length === 0;
  }

  // When the component mounts, it makes a request to the /auth/re endpoint to see if there is an authenticated user.
  useEffect(() => {
    const checkAuthenticatedUser = async () => {
      try {
        // Check if there are cookies
        if (!isObjectEmpty(cookies)) {
          const response = await api.get("/auth/re");
          if (response.data.isAuthenticated) {
            setCurrentUser(response.data.rest);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          console.log("No token cookie.");
        }
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
        setIsAuthenticated(false);
        removeCookie("token");
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
      console.log(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
      removeCookie("token");
    }
  }

  // The login function makes a POST request to the /auth/login endpoint with the email and password.
  // If the login is successful, it updates the current user.
  const login = async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    setCurrentUser(response.data);
    setCookie("token", response.data.token, { path: "/" });
  };

  // The logout function makes a POST request to the /auth/refresh-token endpoint.
  // After the request, it clears the current user.
  const logout = () => {
    api.post("/users/logout");
    setCurrentUser(null);
    removeCookie("token");
  };

  // The provider component renders the AuthContext.Provider component with the current user, loading state, and login and logout functions as the value.
  // All children of this component will have access to these values.
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
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

// This is a custom hook that provides an easy way to access the authentication context.
// It can be used in any functional component that is a child of the AuthProvider.
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    ...context,
  };
}
