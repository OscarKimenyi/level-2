import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./context/ThemeProvider.jsx";
import "./index.css";
import Footer from "./components/Footer";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Footer />
    </ThemeProvider>
  </StrictMode>,
);
