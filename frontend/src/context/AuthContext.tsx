import React, { createContext, useState, useEffect, useContext } from "react";
import { RouteProps } from "react-router-dom";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: RouteProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    setCurrentUser(response.data);
  };

  const logout = () => {
    api.post("/auth/logout").then(() => setCurrentUser(null));
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
