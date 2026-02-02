import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

export default function DarkToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <span
      style={{ cursor: "pointer", fontSize: "22px" }}
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀️" : "🌙"}
    </span>
  );
}
