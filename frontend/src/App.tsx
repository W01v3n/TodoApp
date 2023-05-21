import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import routes from "./routes";
import Footer from "./pages/GeneralSections/Footer";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedComponent from "./components/ProtectedComponent";

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
