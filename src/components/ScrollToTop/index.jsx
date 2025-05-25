import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A React component that automatically scrolls the window to the top
 * whenever the current route's pathname changes.
 *
 * Utilizes the `useLocation` hook from `react-router-dom` to detect
 * route changes and the `useEffect` hook to trigger the scroll action.
 *
 * @component
 * @returns {null} This component does not render any UI.
 */

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
