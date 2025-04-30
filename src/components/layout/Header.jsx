import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function toggleCategories() {
    setIsCategoriesOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-background dark:bg-copy">
      <NavLink to="/">
        <img
          src="/assets/Logo_lightmode.png"
          alt="Holidaze logo of a cabin"
          className="block dark:hidden h-16 md:h-24 lg:h-32"
        />
        <img
          src="/assets/Logo_darkmode.png"
          alt="Holidaze logo of a cabin"
          className="hidden dark:block h-16 md:h-24 lg:h-32"
        />
      </NavLink>
      <button
        className="md:hidden cursor-pointer text-copy dark:text-background"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
      <nav
        className={`${menuOpen ? "flex" : "hidden"} fixed top-20 left-0 w-full z-50 items-center flex-col gap-4 p-8 t shadow-md md:static md:flex md:flex-row md:flex-grow md:justify-evenly md:w-auto md:gap-8 md:shadow-none md:text-l lg:text-xl bg-background dark:bg-copy text-copy dark:text-background`}
      >
        <NavLink to="Venues" className="font-heading">
          All Venues
        </NavLink>
        <div ref={dropdownRef}>
          <button
            onClick={toggleCategories}
            className="cursor-pointer font-heading"
          >
            Categories
          </button>
          {isCategoriesOpen && (
            <div className="flex gap-3">
              <NavLink to="Categories" className="font-body">
                Forest
              </NavLink>
              <NavLink to="Categories" className="font-body">
                Sea
              </NavLink>
              <NavLink to="Categories" className="font-body">
                Mountain
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="About" className="font-heading">
          About us
        </NavLink>
        <NavLink to="Register" className="font-heading">
          Register
        </NavLink>
        <NavLink to="Login" className="font-heading">
          Log in
        </NavLink>
      </nav>
    </header>
  );
}
