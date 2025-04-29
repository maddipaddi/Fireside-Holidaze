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
    <header className="flex items-center justify-between p-4">
      <NavLink to="/">
        <img
          src="/assets/Logo_lightmode.png"
          alt="Holidaze logo of a cabin"
          className="h-16 md:h-24 lg:h-32"
        />
      </NavLink>
      <button
        className="md:hidden cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
      <nav
        className={`${menuOpen ? "flex" : "hidden"} absolute top-20 left-0 w-full flex-col gap-4 p-4 bg-green-900 text-white md:bg-white md:text-black shadow-md md:static md:flex md:flex-row md:flex-grow md:justify-evenly md:w-auto md:gap-8 md:shadow-none md:text-l lg:text-xl`}
      >
        <NavLink to="Venues" className="mx-6">
          All Venues
        </NavLink>
        <div ref={dropdownRef}>
          <button onClick={toggleCategories} className="cursor-pointer mx-6">
            Categories
          </button>
          {isCategoriesOpen && (
            <div>
              <NavLink to="Categories" className="mx-6">
                Forest
              </NavLink>
              <NavLink to="Categories">Sea</NavLink>
              <NavLink to="Categories">Mountain</NavLink>
            </div>
          )}
        </div>
        <NavLink to="About" className="mx-6">
          About us
        </NavLink>
        <NavLink to="Register" className="mx-6">
          Register
        </NavLink>
        <NavLink to="Login" className="mx-6">
          Log in
        </NavLink>
      </nav>
    </header>
  );
}
