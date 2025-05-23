import { useEffect } from "react";

/**
 * DynamicFavicon is a React component that dynamically updates the favicon
 * based on the user's system color scheme (light or dark mode).
 *
 * It listens to changes in the `prefers-color-scheme` media query and swaps
 * the favicon accordingly.
 *
 * This component does not render anything in the UI — it runs effect logic only.
 *
 * @component
 * @returns {null} This component does not render any visible JSX.
 */

function DynamicFavicon() {
  useEffect(() => {
    const setFavicon = (isDark) => {
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
        favicon.href = isDark
          ? "/assets/flavicon-light.png"
          : "/assets/flavicon-dark.png";
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setFavicon(mediaQuery.matches);

    const handler = (e) => setFavicon(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return null;
}

export default DynamicFavicon;
