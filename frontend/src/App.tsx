import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NotAuthenticated/Navbar/Navbar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
