import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

export default function DarkToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button className="btn btn-secondary" onClick={() => setDark(!dark)}>
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
