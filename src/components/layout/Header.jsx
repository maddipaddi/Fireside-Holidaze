import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <header>
      <nav>
        <NavLink to="/">
          <img
            src="/public/assets/Logo_lightmode.png"
            alt="Holidaze logo of a cabin"
          />
        </NavLink>
        <NavLink to="Venues">All venues</NavLink>
        <div ref={dropdownRef}>
          <button onClick={toggleCategories}>Categories</button>
          {isCategoriesOpen && (
            <div>
              <NavLink to="Categories">Forest</NavLink>
              <NavLink to="Categories">Sea</NavLink>
              <NavLink to="Categories">Mountain</NavLink>
            </div>
          )}
        </div>
        <NavLink to="About">About us</NavLink>
        <NavLink to="Register">Register</NavLink>
        <NavLink to="Login">Log in</NavLink>
      </nav>
    </header>
  );
}
