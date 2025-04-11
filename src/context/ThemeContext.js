import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode as that's the current implementation
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check for system preference on component mount
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDarkMode(prefersDarkMode);

    // Add listener for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Use modern event listener or deprecated addListener depending on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for Safari < 14
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Add/remove dark class to body
  useEffect(() => {
    if (!isClient) return;

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode, isClient]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {isClient && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
