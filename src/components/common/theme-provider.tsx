"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false); // To track client-only rendering

  useEffect(() => {
    // Check if running in the browser and set the theme
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      setTheme(storedTheme || defaultTheme);
      setIsMounted(true); // Component is mounted and browser-only features are safe
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (!isMounted) return; // Prevent execution during SSR

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, isMounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (isMounted) {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
