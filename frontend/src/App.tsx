import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Common/Navbar/Navbar";
import routes from "./routes";
import Footer from "./pages/GeneralSections/Footer";
import { AuthProvider } from "./components/Context/Auth/AuthContext";
import ProtectedComponent from "./components/Authenticated/ProtectedComponent";

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
