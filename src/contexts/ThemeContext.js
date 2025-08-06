import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// 🚀 Run before React mounts
(function applyInitialTheme() {
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    // Detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    savedTheme = prefersDark ? "dark" : "light";
    localStorage.setItem("theme", savedTheme);
  }

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(savedTheme);
})();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
