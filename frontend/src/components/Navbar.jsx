import { Link } from "react-router-dom";
import DarkToggle from "./DarkToggle";
import ProfileMenu from "./ProfileMenu";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3 px-md-4 py-3 shadow-lg">
      <div className="container-fluid">
        <Link
          to="/dashboard"
          className="navbar-brand d-flex align-items-center"
        >
          <GraduationCap size={28} className="me-2 me-md-3" />
          <div className="d-none d-md-block">
            <span className="fs-4 fw-bold">Student Management</span>
            <br />
            <span className="fs-6 opacity-75">Dashboard</span>
          </div>
          <div className="d-md-none">
            <span className="fs-5 fw-bold">SMS</span>
          </div>
        </Link>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <DarkToggle />
          </div>
          <div style={{ marginLeft: "0.5rem" }}>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
