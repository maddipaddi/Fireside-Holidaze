import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { logout } from "../../utils/auth.mjs";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isCategoryPage = location.pathname.startsWith("/Categories");

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
    <header className="flex items-center justify-between bg-background dark:bg-darkbackground fixed top-0 left-0 z-50 w-full">
      <NavLink to="/">
        <img
          src="/assets/Logo_lightmode.png"
          alt="Holidaze logo of a cabin"
          className="block dark:hidden h-20 md:h-24 ml-4 p-2"
        />
        <img
          src="/assets/Logo_darkmode.png"
          alt="Holidaze logo of a cabin"
          className="hidden dark:block h-20 md:h-24 ml-4 p-2"
        />
      </NavLink>
      <button
        className="md:hidden cursor-pointer text-copy dark:text-background mr-4"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
      <nav
        className={`${menuOpen ? "flex" : "hidden"} absolute top-full left-0 w-full flex-col items-center gap-4 px-4 pb-8 shadow-md md:static md:flex md:flex-row md:flex-grow md:justify-evenly md:w-auto md:p-0 md:gap-8 md:shadow-none md:text-l lg:text-xl bg-background dark:bg-darkbackground text-copy dark:text-background`}
      >
        <NavLink
          to="Venues"
          className={({ isActive }) =>
            `font-heading px-2 py-1 rounded ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
            }`
          }
        >
          All Venues
        </NavLink>
        <div ref={dropdownRef}>
          <button
            onClick={toggleCategories}
            className={`flex items-center gap-1 cursor-pointer font-heading px-2 py-1 rounded ${
              isCategoryPage
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
            }`}
          >
            Categories{" "}
            {isCategoriesOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {isCategoriesOpen && (
            <div className="ml-4 mt-2 flex flex-col md:min-w-37 bg-background dark:bg-darkbackground gap-4 md:fixed md:px-6 md:py-4 md:m-0 md:rounded md:rounded-t-none md:border-r md:border-l md:border-b md:border-t0 md:bg-accent md:dark:bg-accent md:dark:text-copy">
              <NavLink
                to="/categories/forest"
                className="font-heading font-extralight hover:font-normal"
              >
                Forest
              </NavLink>
              <NavLink
                to="/categories/sea"
                className="font-heading font-extralight hover:font-normal"
              >
                Sea
              </NavLink>
              <NavLink
                to="/categories/mountain"
                className="font-heading font-extralight hover:font-normal"
              >
                Mountain
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="About"
          className={({ isActive }) =>
            `font-heading px-2 py-1 rounded ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
            }`
          }
        >
          About us
        </NavLink>

        {user ? (
          <>
            <button
              onClick={() => {
                logout();
                setUser(null);
                navigate("/");
              }}
              className="cursor-pointer font-heading px-2 py-1 rounded hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
            >
              Log out
            </button>
            <NavLink
              to="Profile"
              className={({ isActive }) =>
                `group p-1 rounded-full ${
                  isActive
                    ? "bg-primary dark:bg-background"
                    : "transition-colors duration-300 hover:bg-primary dark:hover:bg-background"
                }`
              }
            >
              <img
                src={user.avatar?.url || "/default-avatar.png"}
                alt={user.avatar?.alt || "User avatar"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="Register"
              className={({ isActive }) =>
                `font-heading px-2 py-1 rounded ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
                }`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="Login"
              className={({ isActive }) =>
                `font-heading px-2 py-1 rounded ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white dark:hover:bg-background dark:hover:text-copy"
                }`
              }
            >
              Log in
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
