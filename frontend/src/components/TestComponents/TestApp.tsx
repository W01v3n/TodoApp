import { AuthProvider } from "../Context/Auth/AuthContext";
import ProtectedComponent from "../Authenticated/ProtectedComponent";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../../pages/GeneralSections/Footer";

function TestApp() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.isProtected ? (
                <ProtectedComponent component={route.component} />
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default TestApp;
