import { Link } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import NavLink from "./NavLink";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500  to-purple-600 px-4 py-2 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <ul className="hidden space-x-4 md:flex">
            <NavLink to="/" label="Home" />
            <NavLink to="/login" label="Login" />
            <NavLink to="/register" label="Register" />
            <NavLink to="/lists" label="My Lists" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
