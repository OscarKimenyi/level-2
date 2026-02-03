import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  UserPlus,
  GraduationCap,
  User,
  Shield,
  Mail,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
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

  const register = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed. Email might be already taken.",
      );
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register();
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
              <UserPlus size={32} className="text-white" />
            </div>
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p className="text-muted mb-4">
              Join our student management system
            </p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold mb-2">Full Name</label>
            <div className={`input-group ${errors.name ? "has-error" : ""}`}>
              <span className="input-group-text bg-light border-end-0">
                <User size={18} className="text-muted" />
              </span>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.name && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
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

          <div className="mb-3">
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
                placeholder="Create password (min 6 chars)"
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

          <div className="mb-3">
            <label className="form-label fw-semibold mb-2">Role</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Shield size={18} className="text-muted" />
              </span>
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                <option value="student">Student</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div className={`form-check ${errors.terms ? "is-invalid" : ""}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }
                }}
              />
              <label className="form-check-label text-muted" htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary">
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <div className="invalid-feedback d-block">{errors.terms}</div>
              )}
            </div>
          </div>

          <div className="d-grid mb-4">
            <button
              className="btn btn-success btn-lg d-flex align-items-center justify-content-center"
              onClick={register}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="me-2" size={20} />
                  Create Account
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-muted mb-0">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary fw-semibold text-decoration-none"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
