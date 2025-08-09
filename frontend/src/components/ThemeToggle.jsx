import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme")
       || document.documentElement.getAttribute("data-bs-theme")
       || preferred
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isLight = theme === "light";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={`btn btn-sm btn-outline-secondary d-flex align-items-center ${className}`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      <i className={`bi ${isLight ? "bi-moon-stars" : "bi-sun"} fs-6`}></i>
    </button>
  );
}
