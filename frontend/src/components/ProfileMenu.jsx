import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize state from localStorage on component mount
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";
    return {
      name: userName,
      email: userEmail,
    };
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update user info when component mounts
    const updateUserInfo = () => {
      const userName = localStorage.getItem("userName") || "User";
      const userEmail = localStorage.getItem("userEmail") || "user@example.com";

      // Only update if values have changed
      if (userInfo.name !== userName || userInfo.email !== userEmail) {
        setUserInfo({
          name: userName,
          email: userEmail,
        });
      }
    };

    requestAnimationFrame(() => {
      updateUserInfo();
    });

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfo.name, userInfo.email]);

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Close dropdown
    setIsOpen(false);

    // Navigate to login
    navigate("/", { replace: true });

    // Force page reload to clear state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const getInitial = (name) => {
    if (!name || name === "User") return "U";
    return name.charAt(0).toUpperCase();
  };

  // const getFirstName = (fullName) => {
  //   if (!fullName || fullName === "User") return "User";
  //   return fullName.split(" ")[0];
  // };

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      style={{ position: "relative" }}
    >
      <button
        className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-expanded={isOpen}
        aria-label="Profile menu"
      >
        <div className="avatar-circle small d-flex align-items-center justify-content-center me-2">
          {getInitial(userInfo.name)}
        </div>
        {/* <span className="text-white d-none d-md-inline">
          {getFirstName(userInfo.name)}
        </span> */}
        <ChevronDown size={16} className="text-white ms-1" />
      </button>

      {isOpen && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            zIndex: 9999,
            marginTop: "10px",
            minWidth: "200px",
          }}
        >
          <div className="dropdown-header px-3 py-2 border-bottom">
            <div className="d-flex align-items-center">
              <div className="avatar-circle me-3 d-flex align-items-center justify-content-center">
                {getInitial(userInfo.name)}
              </div>
              <div>
                {/* <h6 className="mb-0 fw-bold" style={{ fontSize: "0.95rem" }}>
                  {getFirstName(userInfo.name)}
                </h6> */}
                <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {userInfo.email}
                </small>
              </div>
            </div>
          </div>

          <button
            className="dropdown-item d-flex align-items-center px-3 py-2 text-danger"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
