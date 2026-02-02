import { useState } from "react";
import { ThemeContext } from "./context";

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div
        className={
          dark
            ? "bg-dark text-light min-vh-100"
            : "bg-light text-dark min-vh-100"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
