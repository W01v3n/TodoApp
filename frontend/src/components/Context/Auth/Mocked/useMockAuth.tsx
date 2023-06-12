import { useContext } from "react";
import { MockAuthContext } from "./MockAuthContext";

// This is a custom hook that's a mock of the original useAuth hook.
// Instead of using the real AuthContext, it uses the MockAuthContext
export function useMockAuth() {
  // useContext is a React hook that lets us use the value of a Context
  // Here it's used to get the value of the MockAuthContext.
  const context = useContext(MockAuthContext);

  // If the context is undefined, it means that useMockAuth was called outside of a MockAuthProvider.
  // This would be a mistake, so an error is thrown.
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // The hook returns the context value. The spread operator (...) is used to create a shallow copy of the context object.
  return {
    ...context,
  };
}
