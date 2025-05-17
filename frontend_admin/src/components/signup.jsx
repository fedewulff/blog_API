import { useState } from "react";
import "../css/login-signup-error.css";
import { NavLink, useNavigate } from "react-router";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  async function signUp(e) {
    console.log(username, password, confirmPassword, code);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword, code }),
      });
      const data = await response.json();
      if (response.ok && !data.errors) {
        console.log("Signup successful:", data);
        navigate("/");
      } else {
        if (data.errors) {
          for (let i = 0; i < data.errors.length; i++) {
            console.error("Signup error:", data.errors[i].msg);
          }
        } else {
          console.error("Signup error");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <div className="formContainer">
      <form
        action="http://localhost:9000/admin/signup"
        method="post"
        className="vertical"
        onSubmit={signUp}
      >
        <div className="vertical">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            minLength="2"
            maxLength="20"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="vertical">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength="8"
            maxLength="30"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="vertical">
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength="8"
            maxLength="30"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="vertical">
          <label htmlFor="code">Code</label>
          <input
            type="password"
            name="code"
            id="code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <NavLink to="/" className="backToLogin">
        Back to login
      </NavLink>
    </div>
  );
}

export default Signup;
