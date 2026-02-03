import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      // Apply dark mode to all relevant containers EXCEPT navbar
      document
        .querySelectorAll(
          ".container-fluid:not(.navbar), .container:not(.navbar), .row, .col",
        )
        .forEach((el) => {
          el.classList.add("dark-mode");
        });

      // Apply to dashboard cards and tables
      document
        .querySelectorAll(
          ".dashboard-card, .card:not(.navbar), .table, tbody, thead",
        )
        .forEach((el) => {
          el.classList.add("dark-mode");
        });
    } else {
      document.body.classList.remove("dark-mode");
      // Remove dark mode from all containers
      document
        .querySelectorAll(
          ".container-fluid, .container, .row, .col, .dashboard-card, .card, .table, tbody, thead",
        )
        .forEach((el) => {
          el.classList.remove("dark-mode");
        });
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="btn btn-outline-light border-0 rounded-circle p-2 dark-toggle-container"
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <Sun size={20} className="text-warning" />
      ) : (
        <Moon size={20} className="text-light" />
      )}
    </button>
  );
}
