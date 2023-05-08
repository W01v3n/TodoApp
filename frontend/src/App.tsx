import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NotAuthenticated/Navbar/Navbar";
import routes from "./routes";
import Footer from "./pages/GeneralSections/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
