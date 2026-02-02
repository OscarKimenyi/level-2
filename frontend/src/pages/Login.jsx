import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        className="form-control"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={login}>
        Login
      </button>
    </div>
  );
}
