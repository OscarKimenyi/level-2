import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [show, setShow] = useState(false);

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast.success("Registered successfully");
      window.location = "/";
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 col-md-4 shadow">
        <h3 className="text-center">Register</h3>

        <input
          className="form-control mt-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mt-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="input-group mt-2">
          <input
            className="form-control"
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShow(!show)}
          >
            👁
          </button>
        </div>

        <select
          className="form-control mt-2"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success mt-3" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
