import { useState } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div style={{ position: "relative" }}>
      <span
        style={{ cursor: "pointer", fontSize: "22px" }}
        onClick={() => setOpen(!open)}
      >
        👤
      </span>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            background: "white",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <p>Role: {role}</p>
          <button className="btn btn-sm btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
