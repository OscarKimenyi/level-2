import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div
        className={
          dark
            ? "bg-dark text-light app-wrapper"
            : "bg-light text-dark app-wrapper"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
