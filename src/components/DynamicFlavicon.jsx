import { useEffect } from "react";

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
