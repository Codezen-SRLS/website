import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      // Load theme preference from localStorage on initial mount
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
      return;
    }

    // Save theme preference and update DOM
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [isDarkMode, isClient]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {isClient && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
