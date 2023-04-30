import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-stone-100 bg-hero-pattern px-4 py-2 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl text-black">
            <Link to="/">
              <h1>THYNKSO</h1>
            </Link>
          </div>
          <button
            id="hamburger"
            className="p-2 focus:outline-none lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mb-1 block h-1 w-6 bg-black"></span>
            <span className="mb-1 block h-1 w-6 bg-black"></span>
            <span className="block h-1 w-6 bg-black"></span>
          </button>
          <div className="relative">
            <ul
              className={`${
                isMenuOpen ? "max-h-[10rem]" : "max-h-0"
              } md:max-h-auto absolute left-0 top-12 origin-top transform flex-col space-y-4 overflow-hidden transition-all duration-300 ease-in-out md:static md:flex md:transform-none md:space-x-4 md:space-y-0`}
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
