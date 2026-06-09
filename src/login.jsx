import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import './App.css';

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  }

 return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Log in</h2>
        <form className="auth-form" onSubmit={loginUser}>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit">Log in</button>
        </form>

        <p className="auth-switch">
          New user? Sign up <span onClick={() => navigate("/signup")}>here</span>
        </p>
      </div>
    </div>
  );
}

export default Login