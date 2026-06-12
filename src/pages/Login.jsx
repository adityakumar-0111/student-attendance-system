import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      onLogin();
    } else {
      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">
          🎓 Student Attendance
        </h1>

        <h2 className="login-title2">
          Management System
        </h2>

        <p className="login-subtitle">
          Sign in to continue
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          🔐 Login
        </button>

      </div>
    </div>
  );
}

export default Login;