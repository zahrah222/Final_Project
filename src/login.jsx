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
    <div>
        <header id="header">
        <h1>Book Explorer</h1>
        </header>
    <div className="auth-wrapper">
      <div className="auth-card">
        <img
        className="auth-banner"
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
        alt="books"
        />
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
        <p className="auth-quote">"A reader lives a thousand lives." — George R.R. Martin</p>
      </div>
      <p className="auth-blurb">
      Track every book you read, pinned to the country it came from. 
      Explore the world, one book at a time.
    </p>
    </div>
    </div>
  );
}

export default Login