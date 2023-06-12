import { createContext } from "react";
import { AuthContextData, User } from "../AuthContext";

// Create a new context that has the same structure as your AuthContext
export const MockAuthContext = createContext<AuthContextData | undefined>(
  undefined
);

// Define a mock version of your AuthProvider.
// This Provider takes two props: 'children', which are the components that the Provider wraps, and 'user', which is the user data you want to use for the tests.
export const MockAuthProvider = (
  { children }: React.PropsWithChildren<unknown>,
  user: User
) => {
  // Define no-operation functions to use as mock implementations of the context functions.
  // Since you're not testing the context functionality itself, these functions don't need to do anything.
  const noop = () => {
    console.log("noop function called");
  };
  const noopAsync = async () => {
    console.log("noop async function called");
  };

  // The Provider returns a MockAuthContext.Provider component.
  // The value provided is a mock implementation of the AuthContextData, with fixed values.

  return (
    <MockAuthContext.Provider
      value={{
        currentUser: user, // the currentUser value comes from the 'user prop
        setCurrentUser: noop, // No-op function
        setIsAuthenticated: noop, // No-op function
        isLoading: false, // Fixed value: isLoading is always false in the mock
        logout: noopAsync, // No-op async function
        isAuthenticated: true, // Fixed value: isAuthenticated is always true in the mock
        refreshToken: noopAsync, // No-op async function
      }}
    >
      {children} // Render the children components passed to the
      MockAuthProvider
    </MockAuthContext.Provider>
  );
};
