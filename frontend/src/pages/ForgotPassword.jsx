import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/forgot", {
      email,
    });
    setToken(res.data.token);
  };

  return (
    <div className="auth-card">
      <h4>Reset Password</h4>
      <input
        className="form-control"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary w-100 mt-2" onClick={submit}>
        Get Token
      </button>

      {token && <p>Token: {token}</p>}
    </div>
  );
}
