import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      return setError("All fields required");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container col-4 mt-5">
      <h2>Login</h2>

      {error && <p className="text-danger">{error}</p>}

      <input
        className="form-control"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mt-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={login}>
        Login
      </button>
    </div>
  );
}
