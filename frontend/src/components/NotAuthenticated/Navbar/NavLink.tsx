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
        className="text-gray-900 duration-500 hover:border-y hover:border-slate-950"
      >
        {label}
      </Link>
    </li>
  );
}

export default NavLink;
