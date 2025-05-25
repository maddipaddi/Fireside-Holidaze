import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

/**
 * Provides the user context to its children components.
 *
 * This component manages the user state, synchronizing it with localStorage.
 * When the user state changes, it is persisted to localStorage.
 * On initialization, it attempts to load the user from localStorage.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The UserContext provider with user state and setter.
 */

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
