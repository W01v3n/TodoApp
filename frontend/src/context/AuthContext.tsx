// Import necessary packages and components.
import React, { createContext, useState, useEffect, useContext } from "react";
import { RouteProps } from "react-router-dom";
import api from "../services/api";

// Define the structure of a User object.
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the structure of the authentication context.
// This context will hold the current user, a loading state, and methods to log in and log out.
interface AuthContextData {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with React's createContext function.
// This context can hold a value of type AuthContextData, or it can be undefined.
// Initially, it's set to undefined.
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Create a provider component. This component will provide the authentication context to all of its children.
// This is a common pattern in React: we define a context, then provide it using a special component.
export const AuthProvider: React.FC = ({ children }: RouteProps) => {
  // The current user and loading state are held in state variables.
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // When the component mounts, it makes a request to the /auth/me endpoint to see if there is an authenticated user.
  useEffect(() => {
    const checkAuthenticatedUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setCurrentUser(response.data);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthenticatedUser();
  }, []);

  // The login function makes a POST request to the /auth/login endpoint with the email and password.
  // If the login is successful, it updates the current user.
  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    setCurrentUser(response.data);
  };

  // The logout function makes a POST request to the /auth/logout endpoint.
  // After the request, it clears the current user.
  const logout = () => {
    api.post("/auth/logout").then(() => setCurrentUser(null));
  };

  // The provider component renders the AuthContext.Provider component with the current user, loading state, and login and logout functions as the value.
  // All children of this component will have access to these values.
  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout }}>
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
  return context;
}
