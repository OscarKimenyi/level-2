import { Link } from "react-router-dom";
import DarkToggle from "./DarkToggle";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <Link to="/dashboard" className="navbar-brand">
        SMS
      </Link>

      <div>
        <Link to="/profile" className="text-white me-3">
          Profile
        </Link>
        <DarkToggle />
        <span className="ms-3">
          <LogoutButton />
        </span>
      </div>
    </nav>
  );
}
