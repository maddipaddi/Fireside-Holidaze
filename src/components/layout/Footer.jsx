import { useState, useEffect } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { NavLink } from "react-router-dom";

/**
 * Footer component that displays the website's footer section.
 *
 * Features:
 * - Dynamically switches between light and dark themes based on user preference or system settings.
 * - Persists theme selection in localStorage.
 * - Renders different footer images and background colors for light and dark modes.
 * - Provides buttons to toggle between light and dark themes.
 * - Displays copyright, terms, and privacy policy links.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */

function Footer() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <footer className="relative w-full overflow-hidden bg-background dark:bg-darkbackground">
      <img
        src="/assets/footer-light.png"
        alt="Footer lightmode"
        className="w-full h-auto object-cover block dark:hidden"
      />
      <img
        src="/assets/footer-dark.png"
        alt="Footer darkmode"
        className="w-full h-auto object-cover hidden dark:block"
      />
      <div className="w-full h-20 bg-copy dark:bg-background"></div>

      <div className="absolute inset-0 flex items-center justify-center text-white dark:text-copy px-4 text-sm sm:text-base z-10 translate-y-4 sm:translate-y-8">
        <div className="flex flex-wrap sm:flex-nowrap w-full max-w-sm justify-center sm:justify-between items-center font-body gap-6 sm:gap-16 text-center whitespace-nowrap">
          <p>&copy; {new Date().getFullYear()} Holidaze</p>
          <NavLink to="/terms" className="hover:underline dark:text-copy">
            Terms
          </NavLink>
          <NavLink to="/privacy" className="hover:underline dark:text-copy">
            Privacy Policy
          </NavLink>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("")}
              className={`text-xl p-2 rounded cursor-pointer transition border 
              ${
                theme === ""
                  ? "bg-gray-200 text-black border-gray-400 dark:bg-gray-100 dark:text-black dark:border-gray-400"
                  : "text-gray-400 border-transparent dark:text-copy/45"
              }`}
              aria-label="Light mode"
            >
              <LuSun />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`text-xl p-2 rounded cursor-pointer transition border 
              ${
                theme === "dark"
                  ? "bg-copy text-white border-gray-600 dark:bg-copy dark:text-white dark:border-gray-400"
                  : "text-background/80 border-transparent dark:text-gray-500"
              }`}
              aria-label="Dark mode"
            >
              <LuMoon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
