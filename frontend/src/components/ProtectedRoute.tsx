import React from "react";
import { useNavigate, RouteProps } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

type ProtectedComponentProps = RouteProps & {
  component: React.ComponentType;
};

function ProtectedComponent({ component: Component }: ProtectedComponentProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Component />;
  }

  return null;
}

export default ProtectedComponent;
