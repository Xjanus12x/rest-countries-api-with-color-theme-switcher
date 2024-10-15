import moonIcon from "../assets/images/moon.png";
import sunIcon from "../assets/images/sun.png";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";

export function Header() {
  const { theme, setTheme } = useTheme();
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  // Sync with user's system preference initially
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="shadow-md">
      <div className="container flex items-center justify-between px-4 mx-auto py-7 md:px-12">
        <h1 className="font-extrabold md:text-2xl text-text">Where is the world?</h1>
        <button
          className="flex items-center gap-2 font-bold text-text"
          onClick={toggleTheme}
        >
          <img
            className={`size-4 sm:size-5 ${theme === "dark" && "invert"}`}
            src={`${theme === "light" ? moonIcon : sunIcon}`}
            alt="Haft moon icon"
            aria-hidden
          />
          Dark Mode
        </button>
      </div>
    </header>
  );
}
