import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    function performLogout() {
      try {
        logout();
        navigate("/");
      } catch (error) {
        console.log("Failed to logout. ", error);
      }
    }

    performLogout();
  }, [logout, navigate]);
  return <h3>Logging Out</h3>;
}

export default Logout;
