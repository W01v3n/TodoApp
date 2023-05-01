import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-stone-100 bg-hero-pattern px-4 py-2 shadow-md shadow-black">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl text-black ">
            <Link to="/">
              <h1>THYNKSO</h1>
            </Link>
          </div>
          <button
            id="hamburger"
            className="absolute right-2 p-2 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mb-1 block h-1 w-6 bg-black"></span>
            <span className="mb-1 block h-1 w-6 bg-black"></span>
            <span className="block h-1 w-6 bg-black"></span>
          </button>
          <div className="relative">
            <ul
              className={`${
                isMenuOpen
                  ? "translate-y-2 opacity-100 transition-all duration-500 ease-in-out" //hidden class is not animatable.
                  : "pointer-events-none translate-y-0 opacity-0 transition-all duration-500 ease-in-out md:pointer-events-auto md:flex md:scale-100 md:transform-none md:space-x-4 md:opacity-100"
              } absolute right-0 top-3 w-16 flex-col py-2  md:static md:w-auto md:flex-row md:space-x-4 md:py-0`}
              onClick={() => setIsMenuOpen(false)}
            >
              <NavLink to="/" label="Home" />
              <NavLink to="/login" label="Login" />
              <NavLink to="/register" label="Register" />
              <NavLink to="/lists" label="My Lists" />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
