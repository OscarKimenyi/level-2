import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, GraduationCap, Mail, Lock } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const login = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem(
        "userName",
        res.data.name || formData.email.split("@")[0],
      );
      localStorage.setItem("userEmail", formData.email);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card shadow-lg fade-in">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="avatar-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: "70px", height: "70px" }}
            >
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="fw-bold mb-2">Welcome Back</h2>
            <p className="text-muted mb-4">Sign in to your student account</p>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold mb-2">Email Address</label>
            <div className={`input-group ${errors.email ? "has-error" : ""}`}>
              <span className="input-group-text bg-light border-end-0">
                <Mail size={18} className="text-muted" />
              </span>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold mb-2">Password</label>
            <div
              className={`input-group ${errors.password ? "has-error" : ""}`}
            >
              <span className="input-group-text bg-light border-end-0">
                <Lock size={18} className="text-muted" />
              </span>
              <input
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btn btn-outline-secondary border-start-0"
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="d-grid mb-3">
            <button
              className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
              onClick={login}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="me-2" size={20} />
                  Sign In
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-muted mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary fw-semibold text-decoration-none"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
