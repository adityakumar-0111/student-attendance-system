import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const loginStatus =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    if (savedTheme === "true") {
      setDarkMode(true);

      document.body.classList.add(
        "dark-mode"
      );
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    setIsLoggedIn(false);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(
      "darkMode",
      newMode
    );

    if (newMode) {
      document.body.classList.add(
        "dark-mode"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <Link to="/">
            Dashboard
          </Link>

          <Link to="/students">
            Students
          </Link>

          <Link to="/attendance">
            Attendance
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/analytics">
            Analytics
          </Link>

          <button
            className="theme-btn"
            onClick={toggleDarkMode}
          >
            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;