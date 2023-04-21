import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  label: string;
}

function NavLink({ to, label }: NavLinkProps) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 transition-colors duration-300 hover:text-white"
      >
        {label}
      </Link>
    </li>
  );
}

export default NavLink;
