import { useContext } from "react";
import { AuthContext } from "./AuthContext";

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
