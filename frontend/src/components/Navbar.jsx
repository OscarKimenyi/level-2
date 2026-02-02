import { Link } from "react-router-dom";
import DarkToggle from "./DarkToggle";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <Link to="/dashboard" className="navbar-brand">
        Student Management System
      </Link>

      <div>
        <DarkToggle />
        <span className="ms-3">
          <ProfileMenu />
        </span>
      </div>
    </nav>
  );
}
