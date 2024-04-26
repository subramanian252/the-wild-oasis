import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useContext } from "react";
import { useEffect } from "react";

const DarkContext = createContext();

export default function DarkModeContext({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "dark-mode"
  );

  function toggleDarkMode() {
    setDarkMode((dark) => !dark);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <DarkContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}

export function useDarkModeContext() {
  const darkContext = useContext(DarkContext);
  if (!darkContext) throw new Error("no context was found");
  return darkContext;
}
