import React, { useEffect } from "react";
import { useNavigate, RouteProps } from "react-router-dom";
import { useAuth } from "../Context/Auth/useAuth";

type ProtectedComponentProps = RouteProps & {
  component: React.ComponentType;
};

function ProtectedComponent({ component: Component }: ProtectedComponentProps) {
  const { isAuthenticated, isLoading, refreshToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Try to refresh token before redirecting to /login
      refreshToken()
        .then(() => {
          if (!isAuthenticated) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Failed to refresh token: ", error);
          navigate("/login");
        });
    }
  }, [isLoading, isAuthenticated, navigate, refreshToken]);

  if (isAuthenticated) {
    // console.log("User is authenticated");

    return <Component />;
  } // else {
  //   console.log("User is not authenticated");
  // }

  return null;
}

export default ProtectedComponent;
